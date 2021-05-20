import * as React from "react";
import { ClassRoomModelType, SectionModelType } from "@root/models";
import { sectionService } from "@services/sections";
import {
  Button,
  IconButton,
  List as MuiList,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from "@material-ui/core";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { BatchUpdaterItem as Item } from "./type";
import { findIndex, sortBy } from "lodash";
import { useFormContext, UseFormReturn } from "react-hook-form";
import { observer } from "mobx-react";
import { useSuccessModal } from "@hooks/use-success-modal";

type Props = {
  classroom: ClassRoomModelType;
};

const useBatchUpdate = sectionService.sectionBatchUpdater;

const SequenceItem = ({
  item,
  onUp,
  onDown,
  index,
  form,
}: {
  index: number;
  item: Item;
  onUp(): void;
  onDown(): void;
  form: UseFormReturn;
}) => {
  React.useEffect(() => {
    form.setValue(`map[${index}].sequence`, index + 1);
    form.setValue(`map[${index}].id`, item.id);
  }, [index]);

  return (
    <ListItem>
      <ListItemText primary={`Section ${index + 1} : ${item.title}`} />
      <ListItemSecondaryAction>
        <IconButton onClick={onUp}>
          <ArrowUpward />
        </IconButton>
        <IconButton onClick={onDown}>
          <ArrowDownward />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

const SequenceForm = ({
  sections,
  onSubmit,
}: {
  sections: Array<SectionModelType>;
  onSubmit: () => void;
}) => {
  const form = useFormContext();
  const stateMappper = () => {
    return sections.map(({ id, title, sequence }) => ({
      title,
      sequence,
      id,
    })) as Array<Item>;
  };
  const [items, setItems] = React.useState<Array<Item>>(stateMappper);
  const len = items.length;

  React.useEffect(() => {
    setItems([...sortBy(stateMappper(), ["sequence"])]);
  }, [sections]);

  const setter = (items: any) => {
    return setItems([...items]);
  };

  const mapper = (self: Item, target: Item) => {
    return items.map((item) => {
      if (self.id === item.id) {
        return target;
      }
      if (target.id === item.id) {
        return self;
      }
      return item;
    });
  };

  const getHandler = ({ id }: Item) => {
    const selfIndex = findIndex(items, { id });
    const next = selfIndex === len - 1 ? 0 : selfIndex + 1;
    const prev = selfIndex === 0 ? len - 1 : selfIndex - 1;
    const onUp = () => {
      setter(mapper(items[selfIndex], items[prev] as Item));
    };
    const onDown = () => {
      setter(mapper(items[selfIndex], items[next] as Item));
    };
    return { onDown, onUp };
  };

  return (
    <div>
      <MuiList>
        {items.map((item, index) => (
          <SequenceItem
            index={index}
            item={item}
            key={item.id}
            form={form}
            {...getHandler(item)}
          />
        ))}
      </MuiList>
      <Button onClick={onSubmit}>Save</Button>
    </div>
  );
};

export const SectionBatchUpdater = observer(({ classroom }: Props) => {
  const {
    form,
    provider: Provider,
    result,
    handler,
  } = useBatchUpdate({
    injectInput: {
      classroomId: classroom.id,
    },
  });

  useSuccessModal({
    callback() {
      console.log("ok success");
    },
    depedencies: Boolean(result),
    message: "Section updated successfully",
  });

  return (
    <Provider>
      <SequenceForm sections={[...classroom.sections]} onSubmit={handler} />
    </Provider>
  );
});

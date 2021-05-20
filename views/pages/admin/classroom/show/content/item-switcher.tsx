import { observer } from "mobx-react";
import { ContentModelType } from "@root/models";
import {
  Avatar,
  Button,
  ButtonGroup,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
} from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";
import * as React from "react";
import { useContentList } from "./provider";

const Item = ({
  item,
  active,
  onClick,
}: {
  item: ContentModelType;
  active: boolean;
  onClick(): void;
}) => {
  return (
    <ListItem onClick={onClick} selected={active} button key={item.id}>
      <ListItemAvatar>
        <Avatar src={item.thumbnail} />
      </ListItemAvatar>
      <ListItemText secondary={item.uploader} primary={item.title} />
    </ListItem>
  );
};

export const Controller = observer(() => {
  const { prev, next, nextDisabled, prevDisabled } = useContentList();
  return (
    <ButtonGroup fullWidth>
      <Button onClick={prev} disabled={prevDisabled} startIcon={<ArrowBack />}>
        Sebelumnya
      </Button>
      <Button onClick={next} disabled={nextDisabled} endIcon={<ArrowForward />}>
        Selanjutnya
      </Button>
    </ButtonGroup>
  );
});

export const ContentList = observer(() => {
  const { selected, setActive, data } = useContentList();
  return (
    <Paper>
      <List>
        {data.map((item) => (
          <Item
            key={item.id}
            item={item}
            active={Boolean(selected && selected.id === item.id)}
            onClick={setActive(item)}
          />
        ))}
      </List>
      <Controller />
    </Paper>
  );
});

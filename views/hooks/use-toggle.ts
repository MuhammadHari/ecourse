import {useCallback, useState} from "react";

type UseToggle = [boolean, {
  force : (v: boolean) =>()=>void,
  inline: (v: boolean)=>void,
  toggle:()=>void
}]

export function useToggle() : UseToggle{
  const [loading, setLoading] = useState<boolean>(false);
  const toggle = useCallback(()=>{
    setLoading(! loading)
  }, [loading]);
  const force = useCallback((value: boolean)=>()=>{
      setLoading(value)
    }, [])
  return [loading, {toggle, inline : setLoading, force}]
}

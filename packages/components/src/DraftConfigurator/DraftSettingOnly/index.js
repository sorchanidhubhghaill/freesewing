import React, { useState } from "react";
import FormFieldChecks from "../../.form/FormFieldChecks";
import FormFieldList from "../../.form/FormFieldList";
import OptionPreamble from "../OptionPreamble";

const DraftSettingOnly = props => {
  const [value, setValue] = useState(
    props.value === null ? "dflt" : props.value === false ? "dflt" : "custom"
  );
  const [parts, setParts] = useState(
    value === "custom" ? props.value : props.customDflt
  );
  const [expanded, setExpanded] = useState(false);

  const update = (name, newValue, evt) => {
    setValue(newValue);
    if (newValue === "dflt") props.updateValue("only", false);
    else props.updateValue("only", parts);
  };

  const reset = () => {
    setValue("dflt");
    setParts([]);
    props.updateValue("only", false);
  };

  const updateCustom = (name, newValue, evt) => {
    props.updateValue("only", newValue);
    setParts(newValue);
  };

  const toggleExpanded = () => setExpanded(!expanded);

  const list = {
    dflt: props.labels.dflt,
    custom: props.labels.custom
  };

  let option = (
    <FormFieldList
      name="only"
      value={value}
      dflt={props.dflt}
      onChange={update}
      label="po-list-only"
      updateValue={update}
      list={list}
    />
  );
  if (value === "custom")
    option = (
      <React.Fragment>
        {option}
        <FormFieldChecks
          checks={props.parts}
          name="parts"
          value={value}
          dflt={parts}
          onChange={updateCustom}
          label="po-list-only"
          updateValue={updateCustom}
          list={list}
        />
      </React.Fragment>
    );

  return (
    <li>
      <OptionPreamble
        dflt="dflt"
        value={value}
        desc={props.desc}
        title={props.title}
        id="po-list-only"
        displayValue={props.labels[value]}
        reset={reset}
        toggleExpanded={toggleExpanded}
        expanded={expanded}
        showHelp={() =>
          props.raiseEvent("showHelp", {
            type: "draftSetting",
            value: "only"
          })
        }
        option={option}
        noDocs={props.noDocs}
      />
    </li>
  );
};

export default DraftSettingOnly;

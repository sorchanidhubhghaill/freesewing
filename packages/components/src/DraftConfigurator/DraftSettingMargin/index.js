import React, { useState } from "react";
import PropTypes from "prop-types";
import FormFieldSlider from "../../.form/FormFieldSlider";
import formatMm from "@freesewing/utils/formatMm";
import roundMm from "@freesewing/utils/roundMm";
import sliderStep from "@freesewing/utils/sliderStep";
import OptionPreamble from "../OptionPreamble";

const DraftSettingMargin = props => {
  const [value, setValue] = useState(
    props.value === null ? props.dflt : props.value
  );
  const [expanded, setExpanded] = useState(false);

  const update = (name, newValue, evt) => {
    newValue = roundMm(newValue);
    // Sometimes, when sliding, the rapid succession of updates
    // causes a weird timing issue to result in a value that is NaN.
    // If that's the case, just ignore this update and keep the
    // previous one instead
    if (!isNaN(newValue)) {
      setValue(newValue);
      if (evt.type !== "mousemove") props.updateValue("margin", newValue);
    } else {
      props.updateValue("margin", value);
    }
  };

  const reset = () => {
    setValue(props.dflt);
    props.updateValue("margin", props.dflt);
  };

  const toggleExpanded = () => setExpanded(!expanded);

  let option = (
    <FormFieldSlider
      name="customSa"
      value={value}
      dflt={props.dflt}
      label="po-slider-margin"
      updateValue={update}
      min={0}
      max={25.4}
      step={sliderStep[props.units]}
    />
  );

  return (
    <li>
      <OptionPreamble
        dflt={props.dflt}
        value={value}
        desc={props.desc}
        title={props.title}
        id="po-slider-margin"
        displayValue={formatMm(value, props.units)}
        displayFormat="html"
        reset={reset}
        toggleExpanded={toggleExpanded}
        expanded={expanded}
        showHelp={() =>
          props.raiseEvent("showHelp", {
            type: "draftSetting",
            value: "margin"
          })
        }
        option={option}
        noDocs={props.noDocs}
      />
    </li>
  );
};

DraftSettingMargin.propTypes = {
  raiseEvent: PropTypes.func.isRequired,
  updateValue: PropTypes.func.isRequired,
  title: PropTypes.node.isRequired,
  desc: PropTypes.node.isRequired,
  units: PropTypes.oneOf(["metric", "imperial"]).isRequired
};

DraftSettingMargin.defaultProps = {
  // FIXME
};

export default DraftSettingMargin;

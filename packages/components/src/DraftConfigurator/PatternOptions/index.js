import React, { useState } from "react";
import PropTypes from "prop-types";
import OptionGroup from "../OptionGroup";
import { FormattedMessage } from "react-intl";
import RightIcon from "@material-ui/icons/KeyboardArrowRight";

const PatternOptions = props => {
  const [expanded, setExpanded] = useState([]);
  const toggleGroup = group => {
    let shown = expanded.slice(0);
    let index = shown.indexOf(group);
    if (index === -1) shown.push(group);
    else shown.splice(index, 1);
    setExpanded(shown);
  };

  const renderGroup = group => {
    let open = true;
    if (expanded.indexOf(group) === -1) open = false;
    let output = [];
    let children = null;
    if (expanded.indexOf(group) !== -1)
      children = (
        <ul className="config l3">
          <OptionGroup
            noDocs={props.noDocs}
            key={group + "-group"}
            units={props.units}
            config={props.config}
            gist={props.gist}
            recipe={props.recipe}
            options={props.config.optionGroups[group]}
            updateValue={props.updateValue}
            raiseEvent={props.raiseEvent}
          />
        </ul>
      );
    output.push(
      <li className={open ? "expanded" : "collapsed"} key={group + "-ghead"}>
        <span onClick={() => toggleGroup(group)}>
          <RightIcon
            className={"icon-col-exp " + (open ? "expanded" : "collapsed")}
          />
          <FormattedMessage id={"optiongroups." + group} />
        </span>
        {children}
      </li>
    );

    return output;
  };

  return (
    <ul className="config l2">
      {Object.keys(props.config.optionGroups).map(group => renderGroup(group))}
    </ul>
  );
};

PatternOptions.propTypes = {
  config: PropTypes.object.isRequired,
  raiseEvent: PropTypes.func
};

PatternOptions.defaultProps = {};

export default PatternOptions;

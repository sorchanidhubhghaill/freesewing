import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { injectIntl } from "react-intl";

const OptionGroup = props => {
  return (
    <React.Fragment>
      {props.options.map(name => {
        let output = [];
        if (typeof name === "object") {
          // Subgroup
          for (let subGroup of Object.keys(name)) {
            output.push(
              <h5 key={subGroup + "-title"} className="subheading">
                <FormattedMessage id={"optiongroups." + subGroup} />
              </h5>
            );
            let children = [];
            for (let option of name[subGroup]) children.push(<p>{option}</p>);
            output.push(<ul style={{ paddingLeft: "1rem" }}>{children}</ul>);
          }
        } else
          output.push(
            <li>
              <a href="#logo" onClick={() => props.sampleOption(name)}>
                <FormattedMessage
                  id={"options." + props.config.name + "." + name + ".title"}
                />
              </a>
            </li>
          );

        return output;
      })}
    </React.Fragment>
  );
};

OptionGroup.propTypes = {
  config: PropTypes.object.isRequired,
  options: PropTypes.array.isRequired
};

OptionGroup.defaultProps = {};

export default injectIntl(OptionGroup);

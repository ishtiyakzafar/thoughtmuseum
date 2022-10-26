import React from "react";
import { Input, Select, Radio } from "antd";
import "./FormControl.scss";
import TextArea from "antd/lib/input/TextArea";

const { Option } = Select;

const FormControl = (props) => {
  return (
    <div className={`custome-input custome-input--${props.className}`}>
      {(() => {
        if (props.controlType === "text") {
          return (
            <Input
              prefix={props.prefix}
              suffix={props.suffix}
              type={props.type}
              placeholder={props.placeholder}
              defaultValue={props.defaultValue}
              value={props.value}
              onChange={props.onChange}
              size={props.size}
            />
          );
        } else if (props.controlType === "password") {
          return (
            <Input.Password
              prefix={props.prefix}
              type={props.type}
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.onChange}
              size={props.size}
            />
          );
        } else if (props.controlType === "textarea") {
          return (
            <TextArea
              placeholder={props.placeholder}
              value={props.value}
              onChange={props.onChange}
              rows={props.rows}
              type={props.type}
            />
          );
        } else if (props.controlType === "select") {
          return (
            <Select
              placeholder={props.placeholder}
              defaultValue={props.defaultValue}
              size={props.size}
              handleChange={props.handleChange}
            >
              {props.options.map((item, i) => {
                return (
                  <Option key={i} value={item}>
                    {item}
                  </Option>
                );
              })}
            </Select>
          );
        } else if (props.controlType === "radio") {
          return (
            <Radio.Group>
              {props.options.map((item, i) => {
                return (
                  <Radio key={i} value={item}>{item}</Radio>
                );
              })}
            </Radio.Group>
          );
        }
      })()}
    </div>
  );
};

export default FormControl;

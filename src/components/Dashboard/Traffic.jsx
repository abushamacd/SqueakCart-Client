import React from "react";
import { Pie } from "@ant-design/plots";

const Traffic = () => {
  const data = [
    {
      type: "Instagram",
      value: 27,
      color: "#bb2faf",
    },
    {
      type: "Youtube",
      value: 25,
      color: "#fe0000",
    },
    {
      type: "Google",
      value: 18,
      color: "#fabb05",
    },
    {
      type: "Facebook",
      value: 15,
      color: "#0c86ef",
    },
    {
      type: "Tiktok",
      value: 10,
      color: "#00f2ea",
    },
  ];
  const pieConfig = {
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 1,
    innerRadius: 0.6,
    // color: ({ type }) => {
    //   return "#ffd333";
    // },
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        },
        content: "",
      },
    },
  };
  return (
    <div>
      <Pie {...pieConfig} />
    </div>
  );
};

export default Traffic;

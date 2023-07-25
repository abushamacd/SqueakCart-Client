import React from "react";
import { Avatar, List, message } from "antd";
import VirtualList from "rc-virtual-list";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

const Reviews = () => {
  const fakeDataUrl =
    "https://randomuser.me/api/?results=20&inc=name,gender,email,id,nat,picture&noinfo";
  const ContainerHeight = 400;
  const [data, setData] = useState([]);
  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };
  useEffect(() => {
    appendData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };
  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <div>
              <ReactStars
                count={5}
                className="my-[10px]"
                size={20}
                value={3}
                edit={false}
                activeColor="#ffd700"
              />
            </div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default Reviews;

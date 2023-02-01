import { useEffect, useState } from "react";
import { Post } from "@/components/Post";
import { Divider, List, message, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { getEveryonePublications } from "@/lib/publications/posts";

export const ListOfPosts = () => {
  const [currentCursor, setCurrentCursor] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await getEveryonePublications(currentCursor);
      if (data) {
        const { pageInfo, items } = data.explorePublications;
        setPublications((publications) => [
          ...publications,
          ...items.filter(
            (item) => !publications.map((p) => p.id).includes(item.id)
          ),
        ]);
        setNextCursor(pageInfo.next);
      } else {
        message.error("Error fetching post publication");
      }
    })();
  }, [currentCursor]);

  const loadMoreData = () => {
    setCurrentCursor(nextCursor);
  };
  return (
    <InfiniteScroll
      dataLength={publications.length}
      next={loadMoreData}
      hasMore={!!nextCursor}
      loader={
        <Skeleton
          avatar
          className="bg-white rounded-md mt-10 p-10"
          paragraph={{ rows: 1 }}
          active
        />
      }
      endMessage={
        <Divider style={{ color: "white" }} dashed>
          It is all, nothing more 🤐
        </Divider>
      }
      scrollableTarget="scrollableDiv"
    >
      <List
        dataSource={publications}
        itemLayout="vertical"
        split={<Divider style={{ color: "white" }} dashed />}
        key={(publication) => publication.id}
        renderItem={(publication) => (
          <div className="mt-5">
            <Post publication={publication} />
          </div>
        )}
      />
    </InfiniteScroll>
  );
};

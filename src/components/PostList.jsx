import { useEffect, useState } from "react";
import { Post } from "@/components/Post";
import { Divider, List, message, Skeleton } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";
import { FullScreenLoader } from "./FullScreenLoader";

export const ListOfPosts = ({ dataSource, enabled }) => {
  const [loading, setLoading] = useState(true);
  const [currentCursor, setCurrentCursor] = useState(null);
  const [nextCursor, setNextCursor] = useState(null);
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    if (enabled) {
      setLoading(true);
      (async () => {
        const { data } = await dataSource(currentCursor);
        if (data) {
          const { pageInfo, items } = data.publications;
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
        setLoading(false);
      })();
    }
  }, [currentCursor, dataSource, enabled]);

  const loadMoreData = () => {
    setCurrentCursor(nextCursor);
  };

  if (loading && !publications.length) {
    return <FullScreenLoader />;
  }

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
        loading={loading}
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

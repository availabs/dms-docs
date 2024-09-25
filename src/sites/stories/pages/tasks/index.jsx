import React, { useEffect, useMemo, Fragment } from "react";

import { H1, GridContaier, Card } from "../../ui/";

import { MemberFormat } from "../../stories.formats";

function Tasks({
  dataItems = [],
  attributes,
  user,
  params,
  apiLoad,
  ...props
}) {
  console.log("attributes", attributes);
  const [members, setMembers] = React.useState([]);

  useEffect(() => {
    const loadMembers = async () => {
      let memData = await apiLoad({
        format: MemberFormat,
        children: [
          {
            action: "list",
            path: "/*",
          },
        ],
      });
      setMembers(memData);
    };
    loadMembers();
  }, []);

  let userItems = useMemo(() => {
    const userMemberId = (
      (members || []).find((mem) => Number(mem.user_id) === Number(user.id)) ||
      {}
    ).id;
    return (dataItems || []).reduce((result, item) => {
      const filteredArcs = (item.arcs || []).reduce((arcResult, arc) => {
        const filteredStories = (arc.stories || []).filter(
          (story) =>
            story.owners &&
            story.owners.some((owner) => owner.id === userMemberId)
        );

        if (filteredStories.length > 0) {
          arcResult.push({
            ...arc,
            stories: filteredStories,
          });
        }
        return arcResult;
      }, []);

      if (filteredArcs.length > 0) {
        result.push({
          ...item,
          arcs: filteredArcs,
        });
      }

      return result;
    }, []);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [members]);

  const StoryArcsView = useMemo(() => {
    return attributes["arcs"].ViewComp;
  }, []);

  return (
    <div className="relative mx-auto lg:max-w-7xl ">
      <main className="pb-40">
        <GridContaier>
          {/* ------- Header ----- */}
          <div className="relative xl:col-span-13 sm:col-span-1 flex items-center pt-4">
            <H1>Tasks</H1>
          </div>
          <div className="relative xl:col-span-2 sm:col-span-1 flex items-center pt-4"></div>
          {/* ------- Header ----- */}
          <Card className="xl:col-span-15 flex justify-center">
            {/* <H2>No Tasks</H2> */}
            {(userItems || []).map((item, ind) => (
              <Fragment key={ind}>
                <div className="relative mx-auto lg:max-w-7xl ">
                  <main className="pb-40">
                    <GridContaier>
                      {/* ------- Header ----- */}
                      <div className="relative xl:col-span-13 sm:col-span-1 flex items-center pt-4">
                        <H1>{item?.name}</H1>
                      </div>
                      <div className="flex items-center xl:col-span-2 justify-end pt-4"></div>

                      {/* ------- Story Arcs ----- */}
                      <StoryArcsView value={item?.arcs} item={item} />
                    </GridContaier>
                  </main>
                </div>
              </Fragment>
            ))}
          </Card>
        </GridContaier>
      </main>
    </div>
  );
}

export default Tasks;

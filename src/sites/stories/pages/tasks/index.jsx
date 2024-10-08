import React, { useState, useEffect, useMemo, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";

import { H1, GridContaier, Card } from "../../ui/";
import {
  MemberFormat,
  StoryFormat,
} from "../../stories.formats";

export const TaskContext = React.createContext(undefined);

function Tasks({
  dataItems = [],
  attributes,
  user,
  apiLoad,
  apiUpdate,
  params
}) {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectMember] = useState(undefined);

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
      (members || []).find(
        (mem) => Number(mem.user_id) === Number(selectedMember?.user_id)
      ) || {}
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
  }, [members, selectedMember, dataItems]);

  const StoryArcsView = useMemo(() => {
    return attributes["arcs"].ViewComp;
  }, []);

  useEffect(() => {
    if (params?.userId) {
      setSelectMember(
        (members || []).find(
          (mem) => Number(mem?.id) === Number(params?.userId)
        ) || {}
      );
    } else {
      setSelectMember(
        (members || []).find(
          (mem) => Number(mem?.user_id) === Number(user?.id)
        ) || {}
      );
    }
  }, [user, members, params]);

  const eventManager = async (story, oldStatus, newStatus) => {
    const newEvent = {
      event_time: new Date(),
      event_type: {
        assigned: { users: (story?.owners || []).map((u) => u.id) },
        status_update: {
          old_status: oldStatus,
          new_Status: newStatus,
        },
      },
      event_data: {},
      story,
    };

    await apiUpdate({
      data: {
        id: story.id,
        events: [...(story.events || []), newEvent],
      },
      config: { format: StoryFormat },
    });
  };

  return (
    <TaskContext.Provider
      value={{
        dataItems,
        attributes,
        user,
        apiLoad,
        apiUpdate,
        members,
        selectedMember,
        eventManager
      }}
    >
      <div className="relative mx-auto lg:max-w-7xl ">
        <main className="pb-40">
          <GridContaier>
            {/* ------- Header ----- */}
            <div className="relative xl:col-span-12 sm:col-span-1 flex items-center pt-4">
              <H1>Tasks</H1>
            </div>
            <div className="relative xl:col-span-3 sm:col-span-1">
              <Listbox
                value={selectedMember}
                onChange={(u) => {
                  setSelectMember(u);
                  navigate(`/tasks/${u?.id}`);
                }}
              >
                <div className="relative mt-2">
                  <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                    <span className="block truncate">
                      {selectedMember?.name}
                    </span>
                  </ListboxButton>

                  <ListboxOptions
                    transition
                    className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm"
                  >
                    {members?.map((mem) => (
                      <ListboxOption
                        key={mem?.id}
                        value={mem}
                        className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                      >
                        <span className="block truncate font-normal group-data-[selected]:font-semibold">
                          {mem?.name}
                        </span>
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
            </div>
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
                        {/* <StoryArcsEdit
                          value={item.arcs}
                          item={item}
                          onChange={ArcChanges}
                        /> */}
                      </GridContaier>
                    </main>
                  </div>
                </Fragment>
              ))}
            </Card>
          </GridContaier>
        </main>
      </div>
    </TaskContext.Provider>
  );
}
Tasks.prototype = {
  dataItems: PropTypes.array.isRequired,
  attributes: PropTypes.object.isRequired,
  user: PropTypes.object,
  apiLoad: PropTypes.func.isRequired,
  apiUpdate: PropTypes.func.isRequired,
  params: PropTypes.any.isRequired,
  props: PropTypes.object
}

export default Tasks;

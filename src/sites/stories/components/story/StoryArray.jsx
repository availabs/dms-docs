import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";
import cloneDeep from "lodash/cloneDeep";

import {
  TableInput,
  Table,
  TH,
  TD,
  THead,
  ButtonMenu,
  MenuItem,
} from "../../ui/";
import { ProjectContext } from "../../pages/project";
import { TaskContext } from "../../pages/tasks";
import { StoryFormat, MemberFormat } from "../../stories.formats.js";
import { MagnifyingGlassCircle } from "../../ui/icons";

const statuses = {
  none: {
    bg: "bg-gray-300 hover:bg-gray-200 hover:text-gray-200 text-gray-300",
    index: -1,
    name: "x",
  },
  "Ready to Start": {
    bg: "bg-blue-500 hover:bg-blue-300",
    name: "Ready to Start",
    index: 1,
  },
  "In Progress": {
    bg: "bg-amber-400 hover:bg-amber-300",
    name: "In Progress",
    index: 2,
  },
  "Waiting Review": {
    bg: "bg-indigo-500 hover:bg-indigo-300",
    name: "Waiting Review",
    index: 3,
  },
  "Pending Deploy": {
    bg: "bg-orange-400 hover:bg-orange-300",
    name: "Pending Deploy",
    index: 4,
  },
  Done: { bg: "bg-emerald-500 hover:bg-emerald-400", name: "Done", index: 5 },
  Stuck: { bg: "bg-red-500 hover:bg-red-400", name: "Stuck", index: 6 },
};

const priorities = {
  none: {
    bg: "bg-gray-300 hover:bg-gray-200 hover:text-gray-200 text-gray-300",
    name: "x",
  },
  Critical: { bg: "bg-rose-500 hover:bg-rose-300", name: "Critical" },
  High: { bg: "bg-yellow-400 hover:bg-yellow-300", name: "High" },
  Medium: { bg: "bg-sky-500 hover:bg-sky-300", name: "Medium" },
  Low: { bg: "bg-green-400 hover:bg-green-300", name: "Low" },
};

const types = {
  none: {
    bg: "bg-gray-300 hover:bg-gray-200 hover:text-gray-200 text-gray-300",
    name: "x",
  },
  Feature: { bg: "bg-lime-500 hover:bg-lime-300", name: "Feature" },
  Research: { bg: "bg-purple-500 hover:bg-purple-300", name: "Research" },
  "Data Management": {
    bg: "bg-teal-500 hover:bg-teal-300",
    name: "Data Management",
  },
  "Data Processing": {
    bg: "bg-cyan-500 hover:bg-cyan-300",
    name: "Data Processing",
  },
  Bug: { bg: "bg-pink-400 hover:bg-pink-300", name: "Bug" },
};

const points = {
  none: { bg: "bg-gray-300 hover:bg-gray-200", name: "0" },
  1: { bg: "bg-slate-300 hover:bg-slate-200", name: "1" },
  2: { bg: "bg-slate-400 hover:bg-slate-300", name: "2" },
  3: { bg: "bg-slate-500 hover:bg-slate-300", name: "3" },
  5: { bg: "bg-slate-600 hover:bg-slate-300", name: "5" },
  7: { bg: "bg-slate-700 hover:bg-slate-300", name: "7" },
  10: { bg: "bg-slate-900 hover:bg-slate-300", name: "10" },
};

function StoryDataSelector({ story, type, values }) {
  const { apiUpdate: projectApiUpdate, eventManager: projectEventManager } =
    React.useContext(ProjectContext) || {};
  const { apiUpdate: taskApiUpdate, eventManager: taskEventManager } =
    React.useContext(TaskContext) || {};
  const apiUpdate = projectApiUpdate ?? taskApiUpdate;
  const eventManager = projectEventManager ?? taskEventManager;

  const statusChange = async (key) => {
    await apiUpdate({
      data: { id: story.id, [type]: key },
      config: { format: StoryFormat },
    });
    eventManager(story, story?.status, key);
  };
  return (
    <ButtonMenu
      className=" "
      width={"w-36"}
      location={"-left-0"}
      button={
        <div
          className={`w-36 h-10 text-zinc-50 flex border border-transparent flex-1 items-center justify-center ${
            values[story?.[type] || "none"]?.bg
          } focus:border-blue-700 active:border-blue-700`}
        >
          {values[story?.[type] || "none"]?.name}
        </div>
      }
    >
      {Object.keys(values).map((key) => (
        <MenuItem key={key} onClick={() => statusChange(key)}>
          <div className="flex flex-1 p-1 hover:bg-zinc-100">
            <div
              className={`flex flex-1 p-1 h-8 text-zinc-50 items-center justify-center ${values[key]?.bg}`}
            >
              {values[key]?.name}
            </div>
          </div>
        </MenuItem>
      ))}
    </ButtonMenu>
  );
}

function StoryOwnerSelector({ story, members, values }) {
  const { apiUpdate: projectApiUpdate } =
    React.useContext(ProjectContext) || {};
  const { apiUpdate: taskApiUpdate } = React.useContext(TaskContext) || {};
  const apiUpdate = projectApiUpdate ?? taskApiUpdate;

  //console.log('story', story)
  let ownerIds = (story?.owners || []).map((owner) => owner.id);

  return (
    <ButtonMenu
      className=""
      width={"w-44"}
      location={"-left-0"}
      button={
        <div
          className={`w-44 h-9 text-zinc-50 flex border border-transparent flex-1 items-center justify-center focus:border-blue-700 active:border-blue-700`}
        >
          {(story?.owners || []).map((d, ind) => {
            let mem = (members || []).filter((m) => m.id === d.id)?.[0];
            return (
              <>
                <div
                  key={`${mem?.user_id}_${ind}`}
                  className="rounded-full bg-zinc-300 p-1 h-7 w-7 flex items-center justify-center"
                >
                  {mem?.initials}
                </div>
              </>
            );
          })}
        </div>
      }
    >
      {(members || []).map((member) => {
        let isOwner = ownerIds.indexOf(member.id) !== -1;
        return (
          <MenuItem
            key={member.user_id}
            onClick={() => {
              let newOwners = cloneDeep(story?.owners || []);
              if (isOwner) {
                newOwners = newOwners.filter((d) => d.id !== member.id);
              } else {
                newOwners.push(member);
              }
              console.log("newOwners", newOwners);
              apiUpdate({
                data: { id: story.id, owners: newOwners },
                config: { format: StoryFormat },
              });
            }}
          >
            <div
              className={`flex flex-1 p-1 hover:bg-zinc-100 ${
                isOwner ? "bg-blue-100 hover:bg-blue-200" : ""
              }`}
            >
              <div
                className={`flex flex-1 p-1 h-8 text-zinc-600 items-center justify-between `}
              >
                <div className="rounded-full bg-zinc-300 p-1 h-8 w-8 flex items-center justify-center">
                  {member.initials}
                </div>{" "}
                {member.name}{" "}
              </div>
            </div>
          </MenuItem>
        );
      })}
    </ButtonMenu>
  );
}

function StoryRow({ story, key, members, project: taskProject }) {
  const { project: proj, baseUrl = "" } =
    React.useContext(ProjectContext) || {};
  const project = proj ?? taskProject;

  return (
    <tr
      key={key}
      className="hover:bg-zinc-50 hover:shadow-md dark:hover:bg-zinc-800 border-l-8 border-zinc-500"
    >
      <TD>
        <div className="w-full h-full flex items-center justify-center">
          <input type="checkbox" />
        </div>
      </TD>
      <TD>
        <Link
          to={`${baseUrl}/project/${project?.id}/story/${story?.id}`}
          className="flex group"
        >
          <div className="flex-1">
            <TableInput value={story.title} />
          </div>
          <div className="flex items-center justify-center text-transparent group-hover:text-zinc-400 px-2 cursor-pointer">
            <MagnifyingGlassCircle />
          </div>
        </Link>
      </TD>
      <TD className="w-44 h-10">
        <StoryOwnerSelector story={story} members={members} />
      </TD>
      <TD className="w-36 h-10">
        <StoryDataSelector story={story} type={"status"} values={statuses} />
      </TD>
      <TD className="w-36 h-10">
        <StoryDataSelector
          story={story}
          type={"priority"}
          values={priorities}
        />
      </TD>
      <TD className="w-36 h-10">
        <StoryDataSelector story={story} type={"type"} values={types} />
      </TD>

      <TD className="w-36 h-10">
        <StoryDataSelector story={story} type={"points"} values={points} />
      </TD>
    </tr>
  );
}

function CreateStoryRow({ createStory }) {
  const [storyName, setStoryName] = React.useState();
  return (
    <tr className="hover:bg-zinc-50 hover:shadow-md dark:hover:bg-zinc-800 border-l-8 border-zinc-400">
      <TD>
        <div className="w-full h-full flex items-center justify-center">
          <input disabled type="checkbox" />
        </div>
      </TD>
      <TD border="border-t border-b border-l">
        <TableInput
          value={storyName}
          onChange={(e) => setStoryName(e.target.value)}
          placeholder="+ Add Story"
          onSubmit={() => {
            createStory(storyName);
            setStoryName("");
          }}
          border=""
        />
      </TD>
      <TD colspan="5" border="border-r border-y" />
    </tr>
  );
}

function StatusBar({ stories, type, values }) {
  let statusData = (stories || []).reduce((out, story) => {
    if (!out[story?.[type] || "none"]) {
      out[story?.[type] || "none"] = {
        bg: values[story?.[type] || "none"].bg,
        count: 0,
      };
    }
    out[story?.[type] || "none"].count += 1;
    return out;
  }, {});

  return (
    <div className="w-36 h-full flex p-1">
      {Object.values(statusData).map((status, i) => (
        <div
          key={i}
          className={`${status.bg} h-full`}
          style={{
            width: `${Math.round((status.count / stories.length) * 100)}%`,
          }}
        />
      ))}
    </div>
  );
}

function TableSum({ stories, type }) {
  let total = (stories || []).reduce((out, story) => {
    out += +(story?.[type] || 0);
    return out;
  }, 0);

  return (
    <div className="w-36 h-full flex p-1 items-center justify-center font-medium">
      {total}
    </div>
  );
}

function TotalsRow({ stories }) {
  return (
    <tr className=" dark:hover:bg-zinc-800">
      <TD colspan="3" border="border-none" />
      <TD className="w-36 h-10">
        <StatusBar stories={stories} type={"status"} values={statuses} />
      </TD>
      <TD className="w-36 h-10">
        <StatusBar stories={stories} type={"priority"} values={priorities} />
      </TD>
      <TD className="w-36 h-10">
        <StatusBar stories={stories} type={"type"} values={types} />
      </TD>
      <TD className="w-36 h-10">
        <TableSum stories={stories} type={"points"} values={points} />
      </TD>
    </tr>
  );
}

function Edit({ value, onChange, item, project }) {
  const { apiLoad: projectApiLoad, activeTab } =
    React.useContext(ProjectContext) || {};
  const { apiLoad: taskApiLoad } = React.useContext(TaskContext) || {};
  const apiLoad = projectApiLoad ?? taskApiLoad;

  const createStory = (v) => {
    onChange([...(value || []), { title: v, state: "unstarted" }]);
  };

  const [members, setMembers] = useState([]);

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

  return (
    <div>
      <Table>
        <THead border="border-l-8 border-zinc-500">
          <TH />
          <TH>Story</TH>
          <TH>Owner</TH>
          <TH>Status</TH>
          <TH>Priority</TH>
          <TH>Type</TH>
          <TH>Points</TH>
        </THead>
        <tbody>
          {(value || [])
            .filter((st) => {
              if (activeTab?.name === "Current") {
                return st.status !== "Done";
              } else if (activeTab?.name === "Completed") {
                return st.status === "Done";
              } else return true;
            })
            .sort((a, b) => {
              return (
                statuses[b?.["status"] || "none"].index -
                statuses[a?.["status"] || "none"].index
              );
            })
            .map((story) => (
              <StoryRow
                members={members}
                key={story.id}
                story={story}
                item={item}
                project={project}
              />
            ))}
          <CreateStoryRow createStory={createStory} />
          <TotalsRow stories={value} />
        </tbody>
      </Table>
    </div>
  );
}
Edit.propTypes = {
  value: PropTypes.array.isRequired,
  project: PropTypes.object,
  item: PropTypes.object,
  props: PropTypes.object,
  onChange: PropTypes.func,
};

function View({ value, project }) {
  const { apiLoad: projectApiLoad } = React.useContext(ProjectContext) || {};
  const { apiLoad: taskApiLoad } = React.useContext(TaskContext) || {};
  const apiLoad = projectApiLoad ?? taskApiLoad;

  const [members, setMembers] = useState([]);

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
  return (
    <div>
      <Table>
        <THead border="border-l-8 border-zinc-500">
          <TH />
          <TH>Story</TH>
          <TH>Owner</TH>
          <TH>Status</TH>
          <TH>Priority</TH>
          <TH>Type</TH>
          <TH>Points</TH>
        </THead>
        <tbody>
          {(value || [])
            .sort((a, b) => {
              return (
                statuses[b?.["status"] || "none"].index -
                statuses[a?.["status"] || "none"].index
              );
            })
            .map((story) => (
              <>
                <StoryRow
                  story={story}
                  key={story.id}
                  members={members}
                  project={project}
                />
              </>
            ))}
          <TotalsRow stories={value} />
        </tbody>
      </Table>
    </div>
  );
}
View.propTypes = {
  value: PropTypes.array.isRequired,
  project: PropTypes.object,
  props: PropTypes.object
};

export default {
  EditComp: Edit,
  ViewComp: View,
};

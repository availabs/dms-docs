import React, { Fragment } from "react";

import { H1, H2, ButtonPrimary, Card } from "../../ui/";
import { StoryArcFormat } from "../../stories.formats.js";
import { ProjectContext } from "../../pages/project";
import { TaskContext } from "../../pages/tasks";

function StoryArcEdit({ item, attributes, arcIndex, onChange, project }) {
  const { apiUpdate: projectApiUpdate } = React.useContext(ProjectContext) || {};
  const { apiUpdate: taskApiUpdate } = React.useContext(TaskContext) || {};
  const apiUpdate = projectApiUpdate ?? taskApiUpdate;

  const StoriesEdit = React.useMemo(() => {
    return attributes["stories"].EditComp;
  }, []);

  const handleArcStatusChange = () => {
    onChange({ id: item.id, isCompleted: !item.isCompleted });
  };

  const updateStories = async (v) => {
    await apiUpdate({
      data: {
        id: item.id,
        stories: v,
      },
      config: { format: StoryArcFormat },
    });
  };

  return (
    <Card className="xl:col-span-15 sm:col-span-2">
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center xl:col-span-13 sm:col-span-1">
          <H1>{item.name}</H1>
        </div>
        <div className="flex items-center xl:col-span-2 justify-end">
          <ButtonPrimary onClick={handleArcStatusChange}>
            {item.isCompleted ? "Restore Arc" : "Complete Arc"}
          </ButtonPrimary>
        </div>
      </div>

      <div>
        <StoriesEdit
          value={item.stories}
          item={item}
          project={project}
          onChange={updateStories}
        />
      </div>
    </Card>
  );
}

function StoryArcView({ item, attributes, project }) {
  const StoriesView = React.useMemo(() => {
    return attributes["stories"].ViewComp;
  }, []);

  return (
    <Card className="xl:col-span-15 sm:col-span-2">
      <div className="flex items-center justify-between w-full mb-2">
        <div className="flex items-center xl:col-span-13 sm:col-span-1">
          <H1>{item.name}</H1>
        </div>
        <div className="flex items-center xl:col-span-2 justify-end"> </div>
      </div>

      <div>
        <StoriesView value={item.stories} item={item} project={project} />
      </div>
    </Card>
  );
}

function ArrayEdit({ Component, value, onChange, attr, item: project, ...props }) {
  const { activeTab } = React.useContext(ProjectContext) || {};
  if (!Array.isArray(value)) {
    return (
      <Card className="xl:col-span-15 sm:col-span-2 justify-center text-center">
        <H2>Add a Story Arc</H2>
      </Card>
    );
  }

  const handleArcChange = (updatedArc) => {
    onChange(
      (value || []).map((arc) => {
        if (arc.id === updatedArc.id) {
          return { ...arc, ...updatedArc };
        }
        return arc;
      })
    );
  };

  return (
    <>
      {(value || [])
        .filter((arc) => {
          if (activeTab?.name === "Completed Arcs") {
            return arc.isCompleted === true;
          } else if (
            activeTab?.name === "Current" ||
            activeTab?.name === "Completed"
          ) {
            return (
              Boolean(arc?.isCompleted) === false || arc?.isCompleted === false
            );
          }
          return true;
        })
        .map((v, i) => (
          <StoryArcEdit
            key={v.id}
            item={v}
            project={project}
            arcIndex={i}
            attributes={attr.attributes}
            onChange={handleArcChange}
          />
        ))}
    </>
  );
}

function View({ value, attr, item: project }) {
  return (
    <Fragment>
      {(value || []).map((v, i) => (
        <>
          <StoryArcView
            key={`${v.id}_${i}`}
            item={v}
            arcIndex={i}
            project={project}
            attributes={attr.attributes}
          />
        </>
      ))}
    </Fragment>
  );
}

export default {
  EditComp: ArrayEdit,
  ViewComp: View,
};

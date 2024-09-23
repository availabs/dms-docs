import React from "react";

import {
  P,
  H1,
  H2,
  ModalContainer,
  ButtonPrimary,
  ButtonSecondary,
  GridContaier,
  Card,
  Input,
} from "../../ui/";
import { useFalcor } from "@availabs/avl-falcor";
import { dmsDataEditor } from "~/modules/dms/src";
import { StoryArcFormat } from "../../stories.formats.js";
import { ProjectContext } from "../../pages/project";

function StoryArcEdit({ item, attributes, arcIndex, onChange }) {
  const { falcor } = useFalcor();
  const { apiUpdate } = React.useContext(ProjectContext);

  const StoriesEdit = React.useMemo(() => {
    return attributes["stories"].EditComp;
  }, []);

  const updateStories = async (v) => {
    console.log("updateStories", v);
    await apiUpdate({
      data: {
        id: item.id,
        stories: v,
      },
      config: { format: StoryArcFormat },
    });
    console.log("updated story");
  };

  return (
    <Card className="xl:col-span-15 sm:col-span-2">
      <H2>{item.name}</H2>
      <div>
        <StoriesEdit
          value={item.stories}
          item={item}
          onChange={updateStories}
        />
      </div>
    </Card>
  );
}

function ArrayEdit({ Component, value, onChange, attr, ...props }) {
  if (!Array.isArray(value)) {
    return (
      <Card className="xl:col-span-15 sm:col-span-2 justify-center text-center">
        <H2>Add a Story Arc</H2>
      </Card>
    );
  }

  return (
    <>
      {value.map((v, i) => (
        <StoryArcEdit
          key={v.id}
          item={v}
          arcIndex={i}
          attributes={attr.attributes}
          onChange={() => {}}
        />
      ))}
    </>
  );
}

function View({ Component, value, attr }) {
  return <div> Story Arc View </div>;
}

export default {
  EditComp: ArrayEdit,
  ViewComp: View,
};

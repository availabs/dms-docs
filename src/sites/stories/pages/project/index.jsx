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
  LexicalEdit,
  Tabs,
} from "../../ui/";
import { ProjectFormat } from "../../stories.formats.js";

import { Link, useSubmit, useLocation } from "react-router-dom";

import { json2DmsForm, dmsDataTypes } from "~/modules/dms/src";
import { useImmer } from "use-immer";

import { StoriesContext } from "../../";

import { StoryModal } from "../../components/story/Story";

export const ProjectContext = React.createContext(undefined);

function NewArcModal({ setOpen, state, setState, createArc }) {
  return (
    <ModalContainer open={state?.showNewArc} width={"sm:max-w-3xl "}>
      <H2>Create New Story Arc</H2>
      <P>Name the project and select an overview of the work.</P>
      <Input
        label={"Project Name"}
        value={state.name}
        onChange={(e) => setState({ ...state, name: e.target.value })}
      />
      <LexicalEdit
        label={"Description"}
        value={state.description}
        onChange={(v) => setState({ ...state, description: v })}
      />
      <div className="mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto">
        <ButtonSecondary onClick={setOpen}>Cancel</ButtonSecondary>
        <ButtonPrimary onClick={createArc}>Create Story Arc</ButtonPrimary>
      </div>
    </ModalContainer>
  );
}

function Project({
  dataItems,
  item,
  updateAttribute,
  attributes,
  apiUpdate,
  apiLoad,
  status,
  params,
  ...props
}) {
  const [tabs, setTabs] = React.useState([
    { name: "Current", isActive: true },
    { name: "Completed", isActive: false },
    { name: "Completed Arcs", isActive: false },
  ]);
  const submit = useSubmit();
  const { pathname } = useLocation();
  const { baseUrl = "" } = React.useContext(StoriesContext) || {};

  const defaultState = {
    showNewArc: false,
    name: "",
    description: "",
    projects: [{ id: item?.id }],
  };

  const [state, setState] = React.useState(defaultState);

  const createArc = async () => {
    if (state?.name?.length > 3) {
      const updateItem = {
        id: item.id,
        arcs: [
          ...(item?.arcs || []),
          {
            name: state.name,
            description: state.description,
            projects: state.projects,
          },
        ].filter((d) => d),
      };

      await apiUpdate({ data: updateItem }); //submit(json2DmsForm(updateItem), { method: "post", action: pathname })
      setState(defaultState);
    }
  };

  const StoryArcsEdit = React.useMemo(() => {
    return attributes["arcs"].EditComp;
  }, []);

  const ArcChanges = async (value) => {
    await apiUpdate({
      data: {
        id: item.id,
        arcs: value,
      },
      config: { format: ProjectFormat },
    });
  };

  return (
    <ProjectContext.Provider
      value={{
        project: item,
        params,
        apiUpdate,
        baseUrl,
        apiLoad,
        activeTab: (tabs || []).find((t) => t.isActive),
      }}
    >
      <StoryModal storyId={params.storyId} />
      <div className="relative mx-auto lg:max-w-7xl ">
        <main className="pb-40">
          <GridContaier>
            {/* ------- Header ----- */}
            <div className="relative xl:col-span-13 sm:col-span-1 flex items-center pt-4">
              <H1>{item.name}</H1>
            </div>
            <div className="flex items-center xl:col-span-2 justify-end pt-4">
              <ButtonPrimary
                onClick={(e) => setState({ ...state, showNewArc: true })}
              >
                New Story Arc
              </ButtonPrimary>
              <NewArcModal
                state={state}
                setState={setState}
                createArc={createArc}
                setOpen={() =>
                  setState({ ...state, showNewArc: !state.showNewArc })
                }
              />
            </div>

            <Tabs tabs={tabs} setTabs={setTabs} />

            {/* ------- Story Arcs ----- */}
            <StoryArcsEdit
              value={item.arcs}
              item={item}
              onChange={ArcChanges}
            />
          </GridContaier>
        </main>
      </div>
    </ProjectContext.Provider>
  );
}

export default Project;

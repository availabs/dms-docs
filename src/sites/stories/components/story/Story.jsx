import React, { useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import debounce from "lodash/debounce";
import PropTypes from 'prop-types';

import { ProjectContext } from "../../pages/project";
import { StoryArcFormat, StoryFormat } from "../../stories.formats.js";
import {
  ArrowRight,
  ArrowLeft,
  Cancel,
  MenuDots,
  MagnifyingGlassCircle,
} from "../../ui/icons";
import {
  ModalContainer,
  TableInput,
  TD,
  LexicalEdit,
  ButtonMenu,
  MenuItem,
  Editable,
} from "../../ui/";

export function StoryModal({ storyId }) {
  const { project, apiUpdate, baseUrl } =
    React.useContext(ProjectContext) || {};
  const navigate = useNavigate();

  const debounceDelay = 300;
  let { story, arc } = React.useMemo(
    () =>
      (project?.arcs || []).reduce((out, arc) => {
        let s = (arc?.stories || []).find((s) => s.id == storyId);
        return s ? { story: s, arc } : out;
      }, {}),
    [project, storyId]
  );

  const deleteStory = async (id) => {
    await apiUpdate({
      data: {
        id: arc.id,
        stories: arc.stories.filter((d) => +d.id !== +storyId),
      },
      config: {
        format: StoryArcFormat,
      },
    });
    await apiUpdate({
      data: {
        id,
      },
      config: {
        format: StoryFormat,
      },
      requestType: "delete",
    });
    navigate(`${baseUrl}/project/${project.id}`);
  };

  const handlenameChange = async (title, story) => {
    await apiUpdate({
      data: {
        id: arc.id,
        stories: arc.stories.map((d) => {
          if (Number(d.id) === Number(story?.storyId)) {
            return { ...d, title };
          }
          return { ...d };
        }),
      },
      config: {
        format: StoryArcFormat,
      },
    });
  };

  const lexicalEditTextChange = useCallback(
    debounce((v) => {
      apiUpdate({
        data: { id: story.id, description: v },
        config: { format: StoryFormat },
      });
    }, debounceDelay),
    [debounceDelay, apiUpdate]
  );

  React.useEffect(() => {
    return () => {
      lexicalEditTextChange.cancel();
    };
  }, [lexicalEditTextChange]);

  return (
    <ModalContainer
      open={storyId}
      width={"sm:max-w-7xl "}
      start={"row-start-1  mt-10"}
    >
      <>
        <div className="w-full flex justify-between items-center">
          <Editable
            content={story?.title}
            onChange={handlenameChange}
            debounceDelay={500}
            tag={"div"}
            storyId={storyId}
            className={"focus:outline-none"}
          />
          <div className="flex">
            <div className="h-9 w-9 flex items-center justify-center mx-1 border rounded hover:bg-zinc-200">
              <ArrowLeft className="h-5 w-5" />
            </div>
            <div className="h-9 w-9 flex items-center justify-center mx-1 border rounded hover:bg-zinc-200">
              <ArrowRight className="h-5 w-5" />
            </div>
            <div className="relative">
              <ButtonMenu
                location={"right-0"}
                width={"w-40"}
                button={
                  <div className="h-9 w-9 flex items-center justify-center hover:bg-zinc-200 rounded">
                    <MenuDots className="h-5 w-5" />
                  </div>
                }
              >
                <MenuItem>
                  <div className="flex-1 p-2">Copy Link</div>
                </MenuItem>
                {/*<div className='w-full border-b-2 border-zinc-900' />*/}
                <MenuItem>
                  <div className="flex-1 p-2"> Archive</div>
                </MenuItem>
                <MenuItem onClick={() => deleteStory(storyId)}>
                  {" "}
                  <div className="flex-1 p-2">Delete</div>
                </MenuItem>
              </ButtonMenu>
            </div>
            <Link
              className="h-9 w-9 flex items-center justify-center hover:bg-zinc-200 rounded"
              to={`${baseUrl}/project/${project.id}`}
              // onClick={() => navigate(-1)}
            >
              <Cancel className="h-5 w-5" />
            </Link>
          </div>
        </div>
        <div className="flex py-4 ">
          <div className="flex-1 text-sm  font-light">
            <LexicalEdit
              value={story?.description}
              onChange={(v) => {
                lexicalEditTextChange(v)
                // apiUpdate({
                //   data: { id: story.id, description: v },
                //   config: { format: StoryFormat },
                // });
              }}
            />
          </div>
          <div className="w-64 min-h-64 border"></div>
        </div>
      </>
    </ModalContainer>
  );
}
StoryModal.prototype = {
  storyId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
}

function Story({ story }) {
  const { baseUrl, project } = React.useContext(ProjectContext);
  // const { baseUrl } = React.useContext(StoriesContext);
  return (
    <tr className="hover:bg-zinc-50 hover:shadow-md dark:hover:bg-zinc-800">
      <TD>
        <div className="w-full h-full flex items-center justify-center">
          <input type="checkbox" />
        </div>
      </TD>
      <TD>
        <div className="flex group">
          <div className="flex-1">
            <TableInput value={story.title} />
          </div>
          <Link
            to={`/${baseUrl}/project/${project.id}/story/${story.id}`}
            className="flex items-center justify-center text-transparent group-hover:text-zinc-400 px-2 cursor-pointer"
          >
            <MagnifyingGlassCircle />
          </Link>
        </div>
      </TD>
      <TD />
      <TD />
      <TD />
      <TD />
      <TD />
    </tr>
  );
}
Story.prototype = {
  story: PropTypes.object.isRequired,
  updateStory: PropTypes.func
}

// export default {
//     "EditComp": Edit,
//     "ViewComp": View
// }

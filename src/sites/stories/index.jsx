import React from "react";
import { dmsPageFactory, registerDataType } from "../../modules/dms/src";
import AuthMenu from "./ui/AuthMenu";

import { withAuth } from "@availabs/ams";

import { Selector /*registerComponents*/ } from "../../modules/dms/src";
import cloneDeep from "lodash/cloneDeep";
registerDataType("selector", Selector);

// const API_HOST = "https://graph.availabs.org";

import {
  /*StoryFormat,*/ ProjectFormat,
  MemberFormat,
} from "./stories.formats";

export const StoriesContext = React.createContext(undefined);

import Home from "./pages/home";
import Tasks from "./pages/tasks";
import Project from "./pages/project";
import ManageUsers from "./pages/users/manage";
import Layout from "./pages/layout";
import {
  updateRegisteredFormats,
  updateAttributes,
} from "../../modules/dms/src";

export const storiesConfig = (config) => {
  let {
    baseUrl,
    AUTH_HOST = "https://availauth.availabs.org",
    app = "project-manager2",
    type = "project",
  } = config;
  baseUrl = baseUrl === "/" ? "" : baseUrl;

  const format = cloneDeep(ProjectFormat);
  format.app = app;
  format.type = type;
  updateRegisteredFormats(format.registerFormats, app, type);
  updateAttributes(format.attributes, app, type);

  return {
    format,
    baseUrl,
    children: [
      {
        type: (props) => (
          <StoriesContext.Provider
            value={{ baseUrl, user: props.user, AUTH_HOST, format }}
          >
            <Layout
              logo={
                <div className="flex items-center px-8 h-14 bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-100 text-lg font-bold">
                  Stories
                </div>
              }
              rightMenu={<AuthMenu />}
              baseUrl={baseUrl}
              {...props}
            />
          </StoriesContext.Provider>
        ),
        action: "list",
        path: "/*",
        authLevel: 1,
        filter: {
          attributes: ["name", "desc"],
        },
        children: [
          {
            type: Home,
            action: "view",
            path: "",
          },
          {
            type: Tasks,
            action: "edit",
            path: "tasks",
          },
          {
            type: Tasks,
            action: "edit",
            path: "tasks/:userId",
          },
          {
            type: Project,
            action: "edit",
            path: "project/:id",
          },
          {
            type: Project,
            action: "edit",
            path: "project/:id/story/:storyId",
          },
          // {
          //   type: ManageUsers,
          //   action: "edit",
          //   path: "/manage-users",
          // },
        ],
      },
    ],
  };
};

export const membersConfig = (config) => {
  const { baseUrl, AUTH_HOST = "https://availauth.availabs.org" } = config;
  return {
    format: MemberFormat,
    baseUrl,
    children: [
      {
        type: (props) => (
          <StoriesContext.Provider
            value={{ baseUrl, user: props.user, AUTH_HOST }}
          >
            <Layout
              logo={
                <div className="flex items-center px-8 h-14 bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-100 text-lg font-bold">
                  Stories
                </div>
              }
              rightMenu={<AuthMenu />}
              baseUrl={baseUrl}
              {...props}
            />
          </StoriesContext.Provider>
        ),
        action: "list",
        path: "/*",
        authLevel: 10,
        children: [
          {
            type: ManageUsers,
            action: "edit",
            path: "manage",
          },
        ],
      },
    ],
  };
};

export default [
  dmsPageFactory(
    storiesConfig({ baseUrl: "", app: "project-manager3", type: "project" }),
    withAuth
  ),
  dmsPageFactory(
    membersConfig({
      baseUrl: "/users",
    }),
    withAuth
  ),
];

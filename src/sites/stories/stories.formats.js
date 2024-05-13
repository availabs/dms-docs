import StoryArcArray from './components/story-arc/StoryArcArray'
import StoryArray from './components/story/StoryArray' 




export const StoryArcFormat = {
  app: 'project-manager2',
  type: 'story-arc',
  attributes: [
    {
      key: 'name',
      type: 'text',
      required: true
    },
    {
      key: 'description',
      type: 'lexical'
    },
    {
      key: 'estimated-timespan',
      type: 'text'
    },
    {
      key: 'status',
      type: 'text'
    }, 
    {
      key: 'stories',
      type: 'dms-format',
      isArray: true,
      format: 'project-manager2+story',
      DisplayComp: StoryArray
    },
    {
      key: 'projects',
      type: 'dms-format',
      isArray: true,
      format: 'project-manager2+project',
      // DisplayComp: SectionArray
    }
  ]
}

export const StoryFormat = {
  app: "project-manager2",
  type: "story",
  attributes: [
    { key: "title",
      type: "text",
      required: true
    },
    { key: "project",
      type: "text",
      default: "props:project.data.id"
    },
    { key: "projectVersion",
      type: "text",
      default: "props:project.data.version"
    },
    { key: "index",
      type: "number",
      required: true,
      hidden: true,
      editable: true,
      default: "props:next",
      liveUpdate: true
    },
    { 
      key: "type",
      type: "text"
    },
    { 
      key: "points",
      type: "text",
    },
    { key: "status",
      type: "text",
    },
    { key: "requestedBy",
      type: "text",
      required: true,
      editable: false,
      default: "props:pmMember.data.name",
      liveUpdate: true
    },
    { key: "owner",
      type: "select",
      isArray: true,
      liveUpdate: true,
      inputProps: {
        valueAccessor: d => d.id,
        accessor: d => d.data.name,
        domain: "props:pmMembers"
      }
    },
    { key: "description",
      type: "lexical"
    }
  ]
}

export const Member = {
  app: "project-manager2",
  type: "member",
  attributes: [
    { key: "amsId",
      name: "AVAILabber",
      type: "select",
      required: true,
      editable: "before-create",
      inputProps: {
        domain: "props:availUsers",
        accessor: user => `(${ user.id }) ${ user.email} `,
        valueAccessor: user => user.id
      }
    },
    { key: "name",
      type: "text",
      required: true
    },
    { key: "initials",
      type: "text",
      required: true,
      verify: "^[A-Z]{2,3}$"
    },
    { key: "role",
      type: "select",
      inputProps: {
        domain: ["user", "admin"],
        searchable: false,
        removable: false
      },
      default: "user",
      hidden: "props:hideRole"
    }
  ]
}


export const Notification = {
  app: "project-manager2",
  type: "notification",

  attributes: [
    { key: "subject",
      type: "text",
      required: true
    },
    { key: "body",
      type: "markdown",
      required: true
    },
    { key: "sender",
      type: "text",
      required: true
    },
    { key: "receiver",
      type: "text",
      required: true
    },
    { key: "email",
      type: "text",
      required: true
    }
  ]
}

export const ProjectFormat = {
  app: "project-manager2",
  type: "project",
  registerFormats: [StoryArcFormat, StoryFormat],
  attributes: [
    { key: "name",
      type: "text",
      required: true
    },
    { key: "id",
      type: "text",
      required: true
    },
    { key: "version",
      type: "text",
      default: "1.0.0",
      verify: "^\\d+(?:[.]\\d+){0,2}$"
    },
    { key: "desc",
      type: "text"
    },
    { key: "icebox",
      type: "boolean",
      default: false
    },
    {
      key: 'arcs',
      type: 'dms-format',
      isArray: true,
      format: 'project-manager2+story-arc',
      DisplayComp: StoryArcArray
    },
  ]
}

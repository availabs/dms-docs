import React from "react";
import { withAuth, useAuth } from "@availabs/ams";
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
  Select,
  Table,
  TH,
  TD,
  THead,
} from "../../ui/";

import { StoriesContext } from "../../";

import {
  MemberFormat,
} from "../../stories.formats.js";

const NewUserModal = withAuth(
  ({ open, setOpen, apiUpdate, users }) => {
    const user = useAuth();
    const { AUTH_HOST } = React.useContext(StoriesContext);

    const blankUser = {
      user_id: "",
      email: "",
      name: "",
      initials: "",
      role: "user",
    };
    const [newUser, setNewuser] = React.useState(blankUser);
    const [authUsers, setAuthUsers] = React.useState([]);

    React.useEffect(() => {
      const getAuthUsers = async () => {
        if (user?.token) {
          let r = await fetch(`${AUTH_HOST}/users`, {
            method: "POST",
            headers: {
              Accept: "application/json, text/plain",
              "Content-type": "application/json",
            },
            body: JSON.stringify({ token: user?.token, groups: ["AVAIL"] }),
          });
          let data = await r.json();
          //console.log('users',data.users.filter(d => d?.groups?.includes('AVAIL')))
          setAuthUsers(data.users.filter((d) => d?.groups?.includes("AVAIL")));
        }
      };
      getAuthUsers();
    }, [user.token]);

    //console.log('test 123', users)
    const userIds = users.reduce((ids, user) => {
      ids.push(+user.user_id);
      return ids;
    }, []);
    const createUser = async () => {
      console.log("create", newUser);
      let resp = await apiUpdate({
        data: newUser,
        config: { format: MemberFormat },
      });
      //console.log('update resp', resp)
      //let updatedMembers = await apiLoad({format: MemberFormat})
      //console.log('updatedMembers', updatedMembers)
      setNewuser(blankUser);
      setOpen(false);
    };

    return (
      <ModalContainer open={open} width={"sm:max-w-3xl "}>
        <H2>Add New User</H2>
        <P>User must be in auth group AVAIL to add.</P>

        <Select
          label={"User"}
          value={newUser.user_id}
          onChange={(e) => {
            let user = authUsers.filter((d) => +d.id === +e.target.value)?.[0];
            setNewuser({
              ...newUser,
              user_id: e.target.value,
              email: user.email,
            });
          }}
        >
          <option value={null} className="w-full text-center">
            {" "}
            -- Select User --{" "}
          </option>
          {authUsers
            .filter((d) => userIds.indexOf(+d.id) === -1)
            .map((d) => (
              <option value={d.id} key={d.id}>
                {d.email} ({d.id})
              </option>
            ))}
        </Select>

        <Input
          label={"Name"}
          value={newUser.name}
          onChange={(e) => setNewuser({ ...newUser, name: e.target.value })}
        />

        <Input
          label={"Initials"}
          value={newUser.initials}
          onChange={(e) => setNewuser({ ...newUser, initials: e.target.value })}
        />

        <Select
          label={"Role"}
          value={newUser.role}
          onChange={(e) => setNewuser({ ...newUser, role: e.target.value })}
        >
          <option value={"user"} className="w-full text-center">
            User
          </option>
          <option value={"admin"} className="w-full text-center">
            Admin
          </option>
        </Select>

        <div className="mt-8 flex flex-col-reverse items-center justify-end gap-3 *:w-full sm:flex-row sm:*:w-auto">
          <ButtonSecondary onClick={setOpen}>Cancel</ButtonSecondary>
          <ButtonPrimary
            onClick={createUser}
            disabled={!(newUser.user_id && newUser.name && newUser.initials)}
          >
            Add User
          </ButtonPrimary>
        </div>
      </ModalContainer>
    );
  }
);

function UserRow({ user, apiUpdate }) {
  //const { project, baseUrl, apiUpdate } = React.useContext(ProjectContext) || {}

  const deleteUser = async () => {
    console.log("delete user", user.id);
    return await apiUpdate({
      data: {
        id: user.id,
      },
      config: {
        format: MemberFormat,
      },
      requestType: "delete",
    });
  };
  return (
    <tr className="hover:bg-zinc-50 hover:shadow-md dark:hover:bg-zinc-800 border-l-8 border-zinc-500">
      <TD>
        <div className="w-full h-full flex items-center justify-center">
          {user.user_id}
        </div>
      </TD>
      <TD>
        <div className="w-full h-full flex items-center justify-center">
          {user.name}
        </div>
      </TD>
      <TD>
        <div className="w-full h-full flex items-center justify-center">
          {user.email}
        </div>
      </TD>
      <TD className="w-12 h-10">
        <div className="w-full h-full flex items-center justify-center">
          {user.initials}
        </div>
      </TD>
      <TD className="w-36 h-10">
        <div className="w-full h-full flex items-center justify-center">
          {user.role}
        </div>
      </TD>
      <TD className="w-36 h-10">
        <div
          onClick={deleteUser}
          className="cursor-pointer w-full h-full flex items-center justify-center"
        >
          Delete
        </div>
      </TD>
    </tr>
  );
}

function ManageUsers({ dataItems, apiLoad, apiUpdate, ...props }) {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="relative mx-auto lg:max-w-7xl ">
      <main className="pb-40">
        <GridContaier>
          {/* ------- Header ----- */}
          <div className="relative xl:col-span-13 sm:col-span-1 flex items-center pt-4">
            <H1>Manage Users</H1>
          </div>
          <div className="flex items-center xl:col-span-2 justify-end pt-4">
            <ButtonPrimary onClick={(e) => setOpen(true)}>
              Add User
            </ButtonPrimary>
            <NewUserModal
              open={open}
              apiLoad={apiLoad}
              apiUpdate={apiUpdate}
              setOpen={() => setOpen(!open)}
              users={dataItems}
            />
          </div>

          {/* ------- Header ----- */}
          <Card className="xl:col-span-15 sm:col-span-2">
            {/*<H2>No Users</H2>*/}
            <div>
              <Table>
                <THead border="border-l-8 border-zinc-500">
                  <TH />
                  <TH>User</TH>
                  <TH>Email</TH>
                  <TH>Initials</TH>
                  <TH>Role</TH>
                  <TH />
                </THead>
                <tbody>
                  {(dataItems || []).map((user, i) => (
                    <UserRow key={i} user={user} apiUpdate={apiUpdate} />
                  ))}
                </tbody>
              </Table>
            </div>
          </Card>
        </GridContaier>
      </main>
    </div>
  );
}

export default ManageUsers;

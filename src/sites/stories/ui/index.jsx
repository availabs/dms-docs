import React, { useState, useEffect, useCallback, Fragment } from "react";
import debounce from "lodash/debounce";

import { dmsDataTypes } from "~/modules/dms/src";
import { Menu, Transition } from "@headlessui/react";

const NO_OP = () => {};

export const useClickOutside = (handleClick) => {
  const [node, setNode] = React.useState(null);

  React.useEffect(() => {
    const checkOutside = (e) => {
      if (node.contains(e.target)) {
        return;
      }
      typeof handleClick === "function" && handleClick(e);
    };
    node && document.addEventListener("mousedown", checkOutside);
    return () => document.removeEventListener("mousedown", checkOutside);
  }, [node, handleClick]);

  return [setNode, node];
};

// import { useTheme } from "../../wrappers/with-theme"

export function Dropdown({
  control,
  children,
  className,
  width = "w-full max-w-[200px]",
  openType = "hover",
}) {
  const [open, setOpen] = React.useState(false),
    clickedOutside = React.useCallback(() => setOpen(false), []),
    [setRef] = useClickOutside(clickedOutside);
  // console.log('openType', openType)
  return (
    <div
      ref={setRef}
      className={`h-full relative cursor-pointer ${className}`}
      onMouseEnter={(e) => {
        if (openType === "hover") {
          setOpen(true);
        }
      }}
      onMouseLeave={(e) => setOpen(false)}
      onClick={(e) => {
        //e.preventDefault();
        setOpen(!open);
      }}
    >
      {control}
      {open ? (
        <div
          className={`shadow fixed ${width} rounded-b-lg ${
            open ? `block` : `hidden`
          } z-10`}
        >
          {children}
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export function ButtonMenu({
  button,
  location = "left-0",
  width = "w-36",
  className = "relative inline-block text-left",
  children,
}) {
  return (
    <Menu as="div" className={className}>
      <Menu.Button className="w-full h-full">{button}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items
          className={`absolute z-30 ${location} mt-1 ${width} origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none`}
        >
          {children}
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

export function MenuItem({ children, onClick = NO_OP }) {
  return (
    <Menu.Item>
      {({ active }) => (
        <div
          className={`${
            active ? "bg-zinc-100 " : ""
          } group flex w-full items-center text-zinc-400 cursor-pointer text-sm`}
          onClick={onClick}
        >
          {children}
        </div>
      )}
    </Menu.Item>
  );
}

export function H2({ children }) {
  return (
    <h2 className="text-balance text-lg/6 font-semibold text-zinc-950 sm:text-base/6 dark:text-white">
      {children}
    </h2>
  );
}

export function H1({ children }) {
  return (
    <h1 className="text-balance text-2xl/6 font-semibold text-zinc-950 sm:text-xl/6 dark:text-white">
      {children}
    </h1>
  );
}

export function P({ children }) {
  return (
    <p className="mt-2 text-pretty text-base/6 text-zinc-500 sm:text-sm/6 dark:text-zinc-400">
      {children}
    </p>
  );
}

export function GridOverlay({ children, open }) {
  return (
    <div
      className={`${
        open ? "" : "hidden"
      } z-10 fixed inset-0 flex w-screen justify-center bg-zinc-950/25 px-2 py-2 focus:outline-0 sm:px-6 sm:py-8 lg:px-8 lg:py-16 dark:bg-zinc-950/50`}
    >
      <div className="fixed inset-0 w-screen pt-6 sm:pt-0">
        <div className="grid min-h-full grid-rows-[1fr_auto] justify-items-center sm:grid-rows-[1fr_auto_3fr] sm:p-4">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ModalContainer({
  children,
  open,
  width = "sm:max-w-lg",
  start = "row-start-2",
}) {
  return (
    <GridOverlay open={open}>
      <div
        className={`${width} ${start} overflow-y-auto max-h-[850px] w-full min-w-0 rounded-t-3xl bg-white  shadow-lg ring-1 ring-zinc-950/10  sm:mb-auto sm:rounded-2xl dark:bg-zinc-900 dark:ring-white/10 forced-colors:outline`}
      >
        {children}
      </div>
    </GridOverlay>
  );
}

export function ButtonPrimary({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold hover:bg-zinc-300 dark:hover:bg-zinc-500 cursor-pointer px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 data-[disabled]:opacity-50 [&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-transparent bg-[--btn-border] dark:bg-[--btn-bg] before:absolute before:inset-0 before:-z-10 before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-[--btn-bg] before:shadow dark:before:hidden dark:border-white/5 after:absolute after:inset-0 after:-z-10 after:rounded-[calc(theme(borderRadius.lg)-1px)] after:shadow-[shadow:inset_0_1px_theme(colors.white/15%)] after:data-[active]:bg-[--btn-hover-overlay] after:data-[hover]:bg-[--btn-hover-overlay] dark:after:-inset-px dark:after:rounded-lg before:data-[disabled]:shadow-none after:data-[disabled]:shadow-none text-white [--btn-bg:theme(colors.zinc.900)] [--btn-border:theme(colors.zinc.950/90%)] [--btn-hover-overlay:theme(colors.white/10%)] dark:text-white dark:[--btn-bg:theme(colors.zinc.600)] dark:[--btn-hover-overlay:theme(colors.white/5%)] [--btn-icon:theme(colors.zinc.400)] data-[active]:[--btn-icon:theme(colors.zinc.300)]  cursor-default"
      type="button"
      data-headlessui-state=""
    >
      {children}
      <span
        className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
        aria-hidden="true"
      ></span>
    </button>
  );
}

export function ButtonSecondary({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer hover:bg-zinc-100 dark:hover:bg-zing-300 relative isolate inline-flex items-center justify-center gap-x-2 rounded-lg border text-base/6 font-semibold px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing.3)-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] sm:text-sm/6 focus:outline-none data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-blue-500 data-[disabled]:opacity-50 [&>[data-slot=icon]]:-mx-0.5 [&>[data-slot=icon]]:my-0.5 [&>[data-slot=icon]]:size-5 [&>[data-slot=icon]]:shrink-0 [&>[data-slot=icon]]:text-[--btn-icon] [&>[data-slot=icon]]:sm:my-1 [&>[data-slot=icon]]:sm:size-4 forced-colors:[--btn-icon:ButtonText] forced-colors:data-[hover]:[--btn-icon:ButtonText] border-transparent text-zinc-950 data-[active]:bg-zinc-950/5 data-[hover]:bg-zinc-950/5 dark:text-white dark:data-[active]:bg-white/10 dark:data-[hover]:bg-white/10 [--btn-icon:theme(colors.zinc.500)] data-[active]:[--btn-icon:theme(colors.zinc.700)] data-[hover]:[--btn-icon:theme(colors.zinc.700)] dark:[--btn-icon:theme(colors.zinc.500)] dark:data-[active]:[--btn-icon:theme(colors.zinc.400)] dark:data-[hover]:[--btn-icon:theme(colors.zinc.400)] cursor-default"
      type="button"
      data-headlessui-state=""
    >
      {children}
      <span
        className="absolute left-1/2 top-1/2 size-[max(100%,2.75rem)] -translate-x-1/2 -translate-y-1/2 [@media(pointer:fine)]:hidden"
        aria-hidden="true"
      ></span>
    </button>
  );
}

export function Card({ className = "xl:col-span-5", children, ...props }) {
  return (
    <div className={className}>
      <div className="relative h-full w-full rounded-xl bg-white shadow-[0px_0px_0px_1px_rgba(9,9,11,0.07),0px_2px_2px_0px_rgba(9,9,11,0.05)] dark:bg-zinc-900 dark:shadow-[0px_0px_0px_1px_rgba(255,255,255,0.1)] dark:before:pointer-events-none dark:before:absolute dark:before:-inset-px dark:before:rounded-xl dark:before:shadow-[0px_2px_8px_0px_rgba(0,_0,_0,_0.20),_0px_1px_0px_0px_rgba(255,_255,_255,_0.06)_inset] forced-colors:outline">
        <div className="grid h-full w-full  p-6 py-8 sm:p-8 lg:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}

export function GridContaier({ children }) {
  return (
    <div className="relative grid gap-[17px] sm:grid-cols-2 xl:grid-cols-[repeat(15,_minmax(0,_1fr))] h-full">
      <svg
        className="absolute -top-[9px] left-0 right-0 row-start-2 ml-[calc(50%-50vw)] h-px w-screen"
        fill="none"
      >
        <defs>
          <pattern
            id=":S1:"
            patternUnits="userSpaceOnUse"
            width="16"
            height="1"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0"
              x2="16"
              y1="0.5"
              y2="0.5"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:S1:)"></rect>
      </svg>
      <svg
        className="absolute -top-[9px] left-0 right-0 row-start-3 ml-[calc(50%-50vw)] h-px w-screen"
        fill="none"
      >
        <defs>
          <pattern
            id=":S2:"
            patternUnits="userSpaceOnUse"
            width="16"
            height="1"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0"
              x2="16"
              y1="0.5"
              y2="0.5"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:S2:)"></rect>
      </svg>
      {/*<svg className="absolute -top-[9px] left-0 right-0 row-start-4 ml-[calc(50%-50vw)] h-px w-screen" fill="none"><defs><pattern id=":S3:" patternUnits="userSpaceOnUse" width="16" height="1"><line className="stroke-zinc-950 dark:stroke-white" x1="0" x2="16" y1="0.5" y2="0.5" strokeDasharray="2 2" strokeWidth="1.5" strokeOpacity="0.1" strokeLinejoin="round"></line></pattern></defs><rect width="100%" height="100%" fill="url(#:S3:)"></rect></svg>
       */}
      <svg
        className="absolute -top-[9px] left-0 right-0 row-start-5 ml-[calc(50%-50vw)] h-px w-screen"
        fill="none"
      >
        <defs>
          <pattern
            id=":S4:"
            patternUnits="userSpaceOnUse"
            width="16"
            height="1"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0"
              x2="16"
              y1="0.5"
              y2="0.5"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:S4:)"></rect>
      </svg>
      <svg
        className="absolute -top-[9px] left-0 right-0 row-start-6 ml-[calc(50%-50vw)] h-px w-screen xl:hidden"
        fill="none"
      >
        <defs>
          <pattern
            id=":S5:"
            patternUnits="userSpaceOnUse"
            width="16"
            height="1"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0"
              x2="16"
              y1="0.5"
              y2="0.5"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:S5:)"></rect>
      </svg>
      <svg
        className="absolute -top-[9px] left-0 right-0 row-start-7 ml-[calc(50%-50vw)] h-px w-screen xl:hidden"
        fill="none"
      >
        <defs>
          <pattern
            id=":S6:"
            patternUnits="userSpaceOnUse"
            width="16"
            height="1"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0"
              x2="16"
              y1="0.5"
              y2="0.5"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:S6:)"></rect>
      </svg>
      <svg
        className="absolute -top-[9px] left-0 right-0 row-start-8 ml-[calc(50%-50vw)] h-px w-screen md:hidden"
        fill="none"
      >
        <defs>
          <pattern
            id=":S7:"
            patternUnits="userSpaceOnUse"
            width="16"
            height="1"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0"
              x2="16"
              y1="0.5"
              y2="0.5"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:S7:)"></rect>
      </svg>
      <svg
        className="absolute -top-[9px] left-0 right-0 row-start-9 ml-[calc(50%-50vw)] h-px w-screen md:hidden"
        fill="none"
      >
        <defs>
          <pattern
            id=":S8:"
            patternUnits="userSpaceOnUse"
            width="16"
            height="1"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0"
              x2="16"
              y1="0.5"
              y2="0.5"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:S8:)"></rect>
      </svg>
      <svg
        className="absolute -top-[9px] left-0 right-0 row-start-10 ml-[calc(50%-50vw)] h-px w-screen md:hidden"
        fill="none"
      >
        <defs>
          <pattern
            id=":S9:"
            patternUnits="userSpaceOnUse"
            width="16"
            height="1"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0"
              x2="16"
              y1="0.5"
              y2="0.5"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:S9:)"></rect>
      </svg>
      <svg
        className="absolute -top-[9px] left-0 right-0 row-start-11 ml-[calc(50%-50vw)] hidden h-px w-screen"
        fill="none"
      >
        <defs>
          <pattern
            id=":Sa:"
            patternUnits="userSpaceOnUse"
            width="16"
            height="1"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0"
              x2="16"
              y1="0.5"
              y2="0.5"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:Sa:)"></rect>
      </svg>
      <svg
        className="absolute left-0 right-0 top-2 row-start-12 ml-[calc(50%-50vw)] h-px w-screen translate-y-1/2 sm:row-start-11 md:row-start-8 xl:row-start-6"
        fill="none"
      >
        <defs>
          <pattern
            id=":Sb:"
            patternUnits="userSpaceOnUse"
            width="16"
            height="1"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0"
              x2="16"
              y1="0.5"
              y2="0.5"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:Sb:)"></rect>
      </svg>
      <svg
        className="absolute -left-[9px] top-[-88px] col-start-1 h-[calc(100%+88px+160px)] w-px"
        fill="none"
      >
        <defs>
          <pattern
            id=":Sc:"
            patternUnits="userSpaceOnUse"
            width="1"
            height="16"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0.5"
              x2="0.5"
              y1="0"
              y2="16"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:Sc:)"></rect>
      </svg>
      <svg
        className="absolute -left-[9px] top-[-88px] hidden h-[calc(100%+88px+160px)] w-px sm:col-start-2 sm:block xl:col-start-6"
        fill="none"
      >
        <defs>
          <pattern
            id=":Sd:"
            patternUnits="userSpaceOnUse"
            width="1"
            height="16"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0.5"
              x2="0.5"
              y1="0"
              y2="16"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:Sd:)"></rect>
      </svg>
      <svg
        className="absolute -left-[9px] top-[-88px] col-start-7 hidden h-[calc(100%+88px+160px)] w-px xl:block"
        fill="none"
      >
        <defs>
          <pattern
            id=":Se:"
            patternUnits="userSpaceOnUse"
            width="1"
            height="16"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0.5"
              x2="0.5"
              y1="0"
              y2="16"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:Se:)"></rect>
      </svg>
      <svg
        className="absolute -left-[9px] top-[-88px] col-start-10 hidden h-[calc(100%+88px+160px)] w-px xl:block"
        fill="none"
      >
        <defs>
          <pattern
            id=":Sf:"
            patternUnits="userSpaceOnUse"
            width="1"
            height="16"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0.5"
              x2="0.5"
              y1="0"
              y2="16"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:Sf:)"></rect>
      </svg>
      <svg
        className="absolute -left-[9px] top-[-88px] col-start-11 hidden h-[calc(100%+88px+160px)] w-px xl:block"
        fill="none"
      >
        <defs>
          <pattern
            id=":Sg:"
            patternUnits="userSpaceOnUse"
            width="1"
            height="16"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0.5"
              x2="0.5"
              y1="0"
              y2="16"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:Sg:)"></rect>
      </svg>
      <svg
        className="absolute -right-2 top-[-88px] col-start-3 h-[calc(100%+88px+160px)] w-px translate-x-1/2 sm:col-start-4 xl:col-start-[16]"
        fill="none"
      >
        <defs>
          <pattern
            id=":Sh:"
            patternUnits="userSpaceOnUse"
            width="1"
            height="16"
          >
            <line
              className="stroke-zinc-950 dark:stroke-white"
              x1="0.5"
              x2="0.5"
              y1="0"
              y2="16"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              strokeOpacity="0.1"
              strokeLinejoin="round"
            ></line>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#:Sh:)"></rect>
      </svg>

      {children}
    </div>
  );
}

export function Input({ label, value, placeholder = "", onChange }) {
  return (
    <div className="mt-6">
      <div
        className="[&>[data-slot=label]+[data-slot=control]]:mt-3 [&>[data-slot=label]+[data-slot=description]]:mt-1 [&>[data-slot=description]+[data-slot=control]]:mt-3 [&>[data-slot=control]+[data-slot=description]]:mt-3 [&>[data-slot=control]+[data-slot=error]]:mt-3 [&>[data-slot=label]]:font-medium"
        data-headlessui-state=""
      >
        {label && (
          <label
            data-slot="label"
            className="select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
          >
            {label}
          </label>
        )}
        <span
          data-slot="control"
          className="relative block w-full before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-blue-500 has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none before:has-[[data-invalid]]:shadow-red-500/10"
        >
          <input
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hover]:dark:border-red-500 data-[disabled]:border-zinc-950/20 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%]"
            data-autofocus=""
          />
        </span>
      </div>
    </div>
  );
}

export function Select({ label, value, children, placeholder = "", onChange }) {
  return (
    <div className="mt-6">
      <div
        className="[&>[data-slot=label]+[data-slot=control]]:mt-3 [&>[data-slot=label]+[data-slot=description]]:mt-1 [&>[data-slot=description]+[data-slot=control]]:mt-3 [&>[data-slot=control]+[data-slot=description]]:mt-3 [&>[data-slot=control]+[data-slot=error]]:mt-3 [&>[data-slot=label]]:font-medium"
        data-headlessui-state=""
      >
        {label && (
          <label
            data-slot="label"
            className="select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
          >
            {label}
          </label>
        )}
        <span
          data-slot="control"
          className="relative block w-full before:absolute before:inset-px before:rounded-[calc(theme(borderRadius.lg)-1px)] before:bg-white before:shadow dark:before:hidden after:pointer-events-none after:absolute after:inset-0 after:rounded-lg after:ring-inset after:ring-transparent sm:after:focus-within:ring-2 sm:after:focus-within:ring-blue-500 has-[[data-disabled]]:opacity-50 before:has-[[data-disabled]]:bg-zinc-950/5 before:has-[[data-disabled]]:shadow-none before:has-[[data-invalid]]:shadow-red-500/10"
        >
          <select
            value={value}
            placeholder={placeholder}
            onChange={onChange}
            className="relative block w-full appearance-none rounded-lg px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hover]:dark:border-red-500 data-[disabled]:border-zinc-950/20 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%]"
            data-autofocus=""
          >
            {children}
          </select>
        </span>
      </div>
    </div>
  );
}

export function TableInput({
  label,
  value,
  placeholder = "",
  onChange = () => {},
  onSubmit = () => {},
}) {
  return (
    <input
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onBlur={(e) => {
        if (e.target?.value?.length > 0) {
          onSubmit();
        }
      }}
      onKeyUp={(e) => {
        if (e.key === "Enter" && e.target?.value?.length > 0) {
          onSubmit();
        }
      }}
      className="relative block w-full appearance-none  px-[calc(theme(spacing[3.5])-1px)] py-[calc(theme(spacing[2.5])-1px)] sm:px-[calc(theme(spacing[3])-1px)] sm:py-[calc(theme(spacing[1.5])-1px)] text-base/6 text-zinc-950 placeholder:text-zinc-500 sm:text-sm/6 dark:text-white border border-transparent hover:border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20 bg-transparent dark:bg-white/5 focus:outline-none data-[invalid]:border-red-500 data-[invalid]:data-[hover]:border-red-500 data-[invalid]:dark:border-red-500 data-[invalid]:data-[hover]:dark:border-red-500 data-[disabled]:border-zinc-950/20 dark:data-[hover]:data-[disabled]:border-white/15 data-[disabled]:dark:border-white/15 data-[disabled]:dark:bg-white/[2.5%]"
      data-autofocus=""
    />
  );
}

export function LexicalEdit({ label, value, onChange }) {
  const LexicalComp = dmsDataTypes.lexical.EditComp;
  return (
    <div className="">
      {label && (
        <label
          data-slot="label"
          className="font-medium  select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
        >
          {label}
        </label>
      )}

      <div className="dark:text-zinc-100 dark:bg-zinc-800 rounded border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20">
        <LexicalComp
          value={value}
          onChange={onChange}
          bgColor={"bg-zinc-700"}
        />
      </div>
    </div>
  );
}

export function LexicalView({ label, value }) {
  const LexicalComp = dmsDataTypes.lexical.ViewComp;
  return (
    <div className="mt-6">
      {label && (
        <label
          data-slot="label"
          className="font-medium  select-none text-base/6 text-zinc-950 data-[disabled]:opacity-50 sm:text-sm/6 dark:text-white"
        >
          {label}
        </label>
      )}

      <div className="mt-4 dark:text-zinc-100 dark:bg-zinc-800 rounded border border-zinc-950/10 data-[hover]:border-zinc-950/20 dark:border-white/10 dark:data-[hover]:border-white/20">
        <LexicalComp value={value} />
      </div>
    </div>
  );
}

export function Table({ children }) {
  return (
    <table className="min-w-full text-left text-sm/6 rounded-lg">
      {children}
    </table>
  );
}

export function THead({ children, border }) {
  return (
    <thead
      className={`text-zinc-500 dark:text-zinc-400 border-l-8 border-zinc-500`}
    >
      <tr>{children}</tr>
    </thead>
  );
}

export function TH({ children }) {
  return (
    <th className="border text-center border-zinc-950/10 px-4 py-2 font-medium  dark:border-b-white/10 sm:first:pl-2 sm:last:pr-2">
      {children}
    </th>
  );
}

export function TD({ children, colspan, className, border = "border" }) {
  return (
    <td
      colSpan={colspan}
      className={`text-zinc-500 dark:text-zinc-400 relative ${border} border-zinc-950/5 dark:border-white/5 ${className}`}
    >
      {children}
    </td>
  );
}

export function Tabs({ tabs, setTabs }) {
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleTabChange = (selectedTabName) => {
    setTabs(
      (tabs || []).map((tab) =>
        tab.name === selectedTabName
          ? { ...tab, isActive: true }
          : { ...tab, isActive: false }
      )
    );
  };

  return (
    <div>
      {/* Dropdown for small screens */}
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          value={(tabs || []).find((tab) => tab.isActive)?.name}
          onChange={(e) => handleTabChange(e.target.value)}
          className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
        >
          {(tabs || []).map((tab) => (
            <option key={tab.name} value={tab.name}>
              {tab.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tabs for larger screens */}
      <div className="hidden sm:block">
        <nav aria-label="Tabs" className="flex space-x-4">
          {(tabs || []).map((tab) => (
            <span
              key={tab.name}
              onClick={() => handleTabChange(tab.name)}
              aria-current={tab.isActive ? "page" : undefined}
              className={classNames(
                tab.isActive
                  ? "bg-gray-200 text-gray-800"
                  : "text-gray-600 hover:text-gray-800",
                "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
              )}
            >
              {tab.name}
            </span>
          ))}
        </nav>
      </div>
    </div>
  );
}

export function Editable({
  content,
  onChange,
  debounceDelay = 300,
  tag = "div",
  className,
  ...props
}) {
  const [text, _] = useState(content);

  const debouncedOnChange = useCallback(
    debounce((e) => {
      onChange(e.target.innerText, props);
    }, debounceDelay),
    [debounceDelay, onChange]
  );

  useEffect(() => {
    return () => {
      debouncedOnChange.cancel();
    };
  }, [debouncedOnChange]);

  return React.createElement(
    tag,
    {
      contentEditable: true,
      suppressContentEditableWarning: true,
      className,
      onInput: (e) => {
        debouncedOnChange(e);
      },
    },
    text
  );
}

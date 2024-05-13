import React from 'react'

import { Link } from 'react-router-dom'

import { 
  P, H1, H2, 
  ModalContainer, 
  ButtonPrimary, 
  ButtonSecondary,
  GridContaier, 
  Card, 
  Input,
  TableInput,
  Table,
  TH,
  TD,
  THead,
  ButtonMenu,
	MenuItem
} from '../../ui/'

import {ProjectContext} from '../../pages/project'
import { StoriesContext } from '../../index'
import { StoryArcFormat, StoryFormat } from '../../stories.formats.js'

import {
	MagnifyingGlassCircle
} from '../../ui/icons'


const statuses = {
	'none': { bg: 'bg-gray-300 hover:bg-gray-200 hover:text-gray-200 text-gray-300',index: -1, name: 'x'},
	'Ready to Start': { bg: 'bg-blue-500 hover:bg-blue-300', name: 'Ready to Start',index: 1},
	'In Progress': { bg: 'bg-amber-400 hover:bg-amber-300', name: 'In Progress', index: 2},
	'Waiting Review': { bg: 'bg-indigo-500 hover:bg-indigo-300', name: 'Waiting Review', index: 3},
	'Pending Deploy': { bg: 'bg-orange-400 hover:bg-orange-300', name: 'Pending Deploy', index: 4},
	'Done': { bg: 'bg-emerald-500 hover:bg-emerald-400', name: 'Done', index: 5},
	'Stuck': { bg: 'bg-red-500 hover:bg-red-400', name: 'Stuck', index: 6}
}

const priorities = {
	'none': { bg: 'bg-gray-300 hover:bg-gray-200 hover:text-gray-200 text-gray-300', name: 'x'},
	'Critical': { bg: 'bg-rose-500 hover:bg-rose-300', name: 'Critical'},
	'High': { bg: 'bg-yellow-400 hover:bg-yellow-300', name: 'High'},
	'Medium': { bg: 'bg-sky-500 hover:bg-sky-300', name: 'Medium'},
	'Low': { bg: 'bg-green-400 hover:bg-green-300', name: 'Low'}
}

const types = {
	'none': { bg: 'bg-gray-300 hover:bg-gray-200 hover:text-gray-200 text-gray-300', name: 'x'},
	'Feature': { bg: 'bg-lime-500 hover:bg-lime-300', name: 'Feature'},
	'Research': { bg: 'bg-purple-500 hover:bg-purple-300', name: 'Research'},
	'Bug': { bg: 'bg-pink-400 hover:bg-pink-300', name: 'Bug'},
}

const points = {
	'none': { bg: 'bg-gray-300 hover:bg-gray-200', name: '0'},
	'1': { bg: 'bg-slate-300 hover:bg-slate-200', name: '1'},
	'2': { bg: 'bg-slate-400 hover:bg-slate-300', name: '2'},
	'3': { bg: 'bg-slate-500 hover:bg-slate-300', name: '3'},
	'5': { bg: 'bg-slate-600 hover:bg-slate-300', name: '5'},
	'7': { bg: 'bg-slate-700 hover:bg-slate-300', name: '7'},
	'10': { bg: 'bg-slate-900 hover:bg-slate-300', name: '10'},
}



function StoryDataSelector({story,type, values}) {
	const { apiUpdate } = React.useContext(ProjectContext) || {}
	return (
			<ButtonMenu
			className=' '
			width={'w-36'}
			location={'-left-0'}
			button={(
				<div className={`w-36 h-10 text-zinc-50 flex border border-transparent flex-1 items-center justify-center ${values[story?.[type] || 'none']?.bg} focus:border-blue-700 active:border-blue-700`} >
					 {values[story?.[type] || 'none']?.name} 
				</div>
			)}
		>
			{Object.keys(values).map(key => (
				<MenuItem key={key} onClick={() => apiUpdate({data: {id: story.id, [type]: key}, config: {format: StoryFormat}})}>
					<div className='flex flex-1 p-1 hover:bg-zinc-100'>
						<div className={`flex flex-1 p-1 h-8 text-zinc-50 items-center justify-center ${values[key]?.bg}`}>{values[key]?.name}</div>
					</div>
				</MenuItem>
			))}
		</ButtonMenu>
	)
}

function StoryRow ({story, updateStory}) {
	const { project, baseUrl, apiUpdate } = React.useContext(ProjectContext) || {}
	return (
		<tr className='hover:bg-zinc-50 hover:shadow-md dark:hover:bg-zinc-800 border-l-8 border-zinc-500'>
			<TD>
				<div className='w-full h-full flex items-center justify-center'>
					<input type='checkbox' />
				</div>
			</TD>
			<TD>
				<Link to={`${baseUrl}/project/${project.id}/story/${story.id}`} className='flex group'>
					<div className='flex-1'>
						<TableInput value={story.title} />
					</div>
					<div className='flex items-center justify-center text-transparent group-hover:text-zinc-400 px-2 cursor-pointer'>
						<MagnifyingGlassCircle />
					</div>
				</Link>
			</TD>
			<TD />
			<TD className='w-36 h-10'> 
				<StoryDataSelector
					story={story}
					type={'status'}
					values={statuses}
				/>
			</TD>
			<TD className='w-36 h-10'> 
				<StoryDataSelector
					story={story}
					type={'priority'}
					values={priorities}
				/>
			</TD>
			<TD className='w-36 h-10'> 
				<StoryDataSelector
					story={story}
					type={'type'}
					values={types}
				/>
			</TD>

			<TD className='w-36 h-10'> 
				<StoryDataSelector
					story={story}
					type={'points'}
					values={points}
				/>
			</TD>
		</tr>
	)
}


function CreateStoryRow ({createStory}) {
	const [storyName, setStoryName] = React.useState()
	return (
		<tr className='hover:bg-zinc-50 hover:shadow-md dark:hover:bg-zinc-800 border-l-8 border-zinc-400'>
			<TD>
				<div className='w-full h-full flex items-center justify-center'>
				<input disabled type='checkbox' />
				</div>
			</TD>
			<TD border='border-t border-b border-l'>
				<TableInput 
					value={storyName} 
					onChange={(e) => setStoryName(e.target.value)} 
					placeholder="+ Add Story" 
					onSubmit={() => { 
						createStory(storyName)
						setStoryName('')
					}} 
					border='' 
				/>
			</TD>
			<TD colspan='5' border='border-r border-y' />
		</tr>
	)
}

function StatusBar ({stories, type, values}) {
	
	let statusData = (stories || []).reduce((out,story) => {
		if(!out[story?.[type] || 'none']) {
			out[story?.[type] || 'none'] = { bg: values[story?.[type] || 'none'].bg, count: 0 }
		}
		out[story?.[type] || 'none'].count += 1
		return out
	},{})

	return (
		<div className='w-36 h-full flex p-1'>
			{Object.values(statusData).map((status,i) => (
				<div 
					key={i} 
					className={`${status.bg} h-full`}
					style={{width: `${Math.round((status.count/stories.length)*100)}%`}}
				/>
			))}
		</div>
	)
}

function TableSum ({stories, type}) {
	
	let total = (stories || []).reduce((out,story) => {
		
		out += +(story?.[type] || 0)
		return out
	}, 0)

	
	return (
		<div className='w-36 h-full flex p-1 items-center justify-center font-medium'>
			{total}
		</div>
	)
}

function TotalsRow ({stories}) {
	
	return (
		<tr className=' dark:hover:bg-zinc-800'>
			<TD colspan='3' border='border-none' />
			<TD className='w-36 h-10'> 
				<StatusBar
					stories={stories}
					type={'status'}
					values={statuses}
				/>
			</TD>
			<TD className='w-36 h-10'> 
				<StatusBar
					stories={stories}
					type={'priority'}
					values={priorities}
				/>
			</TD>
			<TD className='w-36 h-10'> 
				<StatusBar
					stories={stories}
					type={'type'}
					values={types}
				/>
			</TD>
			<TD className='w-36 h-10'> 
				<TableSum
					stories={stories}
					type={'points'}
					values={points}
				/>
			</TD>
		</tr>
	)
}

    

function Edit ({Component, item, value, onChange, attr, ...props }) {
	
	
	const createStory = (v) => {
		onChange([
			...(value || []), 
			{ title: v, state: 'unstarted' } 
		])
	}
	

	return (
		<div>
			
			<Table>
				<THead border='border-l-8 border-zinc-500'>
					<TH/>
					<TH>Story</TH>
					<TH>Owner</TH>
					<TH>Status</TH>
					<TH>Priority</TH>
					<TH>Type</TH>
					<TH>Points</TH>
				</THead>
				<tbody>
					{(value || [])
						.sort((a,b) => {
							//console.log('sort',a,b, a?.[status] || 'none', a?.[status] || 'none', statuses[b?.[status] || 'none'].index, statuses[a?.[status] || 'none'].index , statuses[b?.[status] || 'none'].index - statuses[a?.[status] || 'none'].index)
							return statuses[b?.['status'] || 'none'].index - statuses[a?.['status'] || 'none'].index
						})
						.map((story,i) => <StoryRow key={i} story={story} />)}
					<CreateStoryRow createStory={createStory}/>
					<TotalsRow stories={value} />
				</tbody>
			</Table>
		</div>
	)
}


function View ({Component, value, attr }) {
	return (
		<div> Story Arc View </div>
	)
}


export default {
    "EditComp": Edit,
    "ViewComp": View
}
import { useState } from 'react'
import { Box } from '@mui/system'
import DragAndDrop from './DragAndDrop'

const initialItems = [
  { title: 'result' },
  { title: 'paragraph' },
  { title: 'wedding' },
  { title: 'sight' },
  { title: 'heat' },
  { title: 'reputation' },
  { title: 'power' },
  { title: 'potential' },
  { title: 'lobby' },
  { title: 'genuine' },
  { title: 'recommend' },
  { title: 'stool' },
]

const Dnd = () => {
  const [items, setItems] = useState(initialItems)

  return (
    <div>
      <DragAndDrop
        items={items}
        draggableIdKey="title"
        onDragEnd={setItems}
        renderChild={({ title }) => (
          <Box padding="2px" textAlign="center">
            <Box backgroundColor="bisque" paddingY="12px">
              {title}
            </Box>
          </Box>
        )}
      />
    </div>
  )
}

export default Dnd

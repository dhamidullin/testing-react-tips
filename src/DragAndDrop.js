/* eslint-disable */
import { Grid } from '@mui/material'
import { useCallback, useEffect, useState } from 'react'
import { useDrag, useDrop } from 'react-dnd'

const DragAndDrop = function DragAndDrop(props) {
  const [items, setItems] = useState([])
  const [dragProgressData, setDragProgressData] = useState(null)
  const { items: operands, draggableIdKey } = props

  useEffect(() => {
    setItems(operands)
  }, [operands])

  const findItem = useCallback(key => {
    const index = items.findIndex(item => item[draggableIdKey] + '' === key)

    return {
      item: items[index],
      index: index,
    }
  }, [items])

  const moveCard = useCallback((id, targetIndex) => {
    const { index: sourceIndex } = findItem(id)

    const result = [...items]
    const sourceItem = result[sourceIndex]
    const targetItem = result[targetIndex]

    if (!dragProgressData) {
      setDragProgressData({ item: sourceItem, originalIndex: sourceIndex })
    }

    result[sourceIndex] = targetItem
    result[targetIndex] = sourceItem

    setItems(result)
  }, [findItem, items, dragProgressData]);

  const dragEnd = useCallback(targetIndex => {
    if (dragProgressData) {
      const { originalIndex: sourceIndex } = dragProgressData

      props.onDragEnd(items, sourceIndex, targetIndex)
      setDragProgressData(null)
    }

  }, [items, dragProgressData])

  const [, drop] = useDrop(() => ({ accept: 'card' }))

  return (
    <Grid container ref={drop} >
      {items.map((item, index) => {
        const id = item[draggableIdKey] + ''

        return (
          <Draggable
            key={id}
            id={id}
            findItem={findItem}
            moveCard={moveCard}
            dragEnd={dragEnd}
          >
            {props.renderChild(item, index, props)}
          </Draggable>
        )
      })}
    </Grid>
  )
}

const Draggable = function Draggable(props) {
  const { id, findItem } = props
  const originalIndex = findItem(id).index

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'card',
    item: { id, originalIndex },
    collect: monitor => ({ isDragging: monitor.isDragging() }),
    end: (item, monitor) => {
      const didDrop = monitor.didDrop()

      if (didDrop) {
        const resultIndex = props.findItem(id).index
        props.dragEnd(resultIndex)
      }
    },
  }), [id, originalIndex, props.moveCard])


  const [, drop] = useDrop(() => ({
    accept: 'card',
    hover({ id: draggedId }) {
      if (draggedId !== id) {
        const { index: overIndex } = findItem(id)
        props.moveCard(draggedId, overIndex)
      }
    },
  }), [findItem, props.moveCard])

  return (
    <Grid
      item
      xs={3}
      ref={(node) => drag(drop(node))}
      style={{ opacity: +!isDragging }}
    >
      {props.children}
    </Grid>
  )
}

export default DragAndDrop

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './App.css';

const initialItems = [
  { id: '1', content: 'Item 1' },
  { id: '2', content: 'Item 2' },
  { id: '3', content: 'Item 3' },
];

const App = () => {
  const [items, setItems] = useState(initialItems);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const { source, destination } = result;
    const newItems = [...items];
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);
    setItems(newItems);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <ul {...provided.droppableProps} ref={provided.innerRef}>
            {items.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  // Inside the Draggable component:
                  <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      backgroundColor: snapshot.isDragging ? 'rgb(231, 179, 179)' : '',
                      ...provided.draggableProps.style
                    }}
                    className='item'
                  >
                    {item.content}
                  </li>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
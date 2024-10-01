import React, { useState } from "react";
import GridLayout, { Layout } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";


interface GridItemProps {
  title: string;
  content: string;
}

interface Widget extends Layout {
  component: React.FC<GridItemProps>
}


const GridItem: React.FC<GridItemProps> = ({ title, content }) => {

  return (
    <div style={{ border: "1px solid black",  height: "100%" }}>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};


const MyGrid: React.FC = () => {

  const layout: Layout[] = [
    { i: "1", x: 0, y: 0, w: 2, h: 2 },
    { i: "2", x: 2, y: 0, w: 2, h: 2 },
    { i: "3", x: 4, y: 0, w: 2, h: 2 },
  ];

  return (
    <GridLayout
      className="layout"
      layout={layout}
      cols={16}  
      rowHeight={100}  
      width={1200}  
      isResizable={true} 
      isDraggable={true} 
    >
      <div key="1">
        <GridItem title="Item 1" content="This is the first item" />
      </div>
      <div key="2">
        <GridItem title="Item 2" content="This is the second item" />
      </div>
      <div key="3">
        <GridItem title="Item 3" content="This is the third item" />
      </div>
    </GridLayout>
  );
};

export default MyGrid;

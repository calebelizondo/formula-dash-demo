import { FunctionComponent, useState, useEffect } from "react";
import _ from "lodash";
import { Responsive, WidthProvider } from "react-grid-layout";
//import "./../node_modules/react-grid-layout/css/styles.css";
import "./../../node_modules/react-grid-layout/css/styles.css";
//import "react-resizable/css/styles.css";
import "./../../node_modules/react-resizable/css/styles.css";
import "./styles.css";
import { HANDLES } from "../widgets/consts";
import BaseWidget from "../widgets/widget_base/BaseWidget";

interface DashboardProps {
  domElements: any[];
  className?: string;
  rowHeight?: number;
  onLayoutChange?: (layout: any, layouts: any) => void;
  cols?: any;
  breakpoints?: any;
  containerPadding?: [number, number] | { [key: string]: [number, number] };
}

const ResponsiveReactGridLayout = WidthProvider(Responsive);

const Dashboard: FunctionComponent<DashboardProps> = (props) => {
  const [layouts, setLayouts] = useState<{ [index: string]: any[] }>({
    lg: _.map(_.range(0, 25), function (item, i) {
      var y = Math.ceil(Math.random() * 4) + 1;
      return {
        x: (_.random(0, 5) * 2) % 12,
        y: Math.floor(i / 6) * y,
        w: 2,
        h: y,
        i: i.toString(),
        static: false,//Math.random() < 0.05,
        resizeHandles: [],
      };
    })
  });
  const [currentBreakpoint, setCurrentBreakpoint] = useState<string>("lg");
  const [compactType, setCompactType] = useState<"vertical" | "horizontal" | null | undefined >("vertical");
  const [mounted, setMounted] = useState(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({
    lg: []
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onBreakpointChange = (breakpoint: any) => {
    setCurrentBreakpoint(breakpoint);
    setToolbox({
      ...toolbox,
      [breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || []
    });
  };

  const onItemClick = (itemId: string) => {
    setSelectedItem(itemId);
    setLayouts(prevLayouts => {
      const newLayouts = { ...prevLayouts };
      newLayouts.lg = newLayouts.lg.map(item => ({
        ...item,
        resizeHandles: item.i === itemId ? HANDLES : []
      }));
      return newLayouts;
    });
  };

  const onCompactTypeChange = () => {
    let oldCompactType = "";

    const compactType =
      oldCompactType === "horizontal"
        ? "vertical"
        : oldCompactType === "vertical"
        ? null
        : "horizontal";
    setCompactType(compactType);
  };

  const onLayoutChange = (layout: any, layouts: any) => {
    setLayouts({ ...layouts });
  };

  const onDrop = (layout: any, layoutItem: any, _ev: any) => {
    alert(
      `Element parameters:\n${JSON.stringify(
        layoutItem,
        ["x", "y", "w", "h"],
        2
      )}`
    );
  };

  const generateDOM = () => {
    return _.map(layouts.lg, function (l, i) {
      return (

        <div
          key={i}
          style={{ background: "#ccc" }}
          className={l.static ? "static" : ""}
          onClick={() => onItemClick(l.i)}
        >
          {l.static ? (
            <span
              className="text"
              title="This item is static and cannot be removed or resized."
            >
              Static - {i}
            </span>
          ) : (
            <span className="text">{i}</span>
          )}
        </div>
      );
    });
  };

  return (
    <>
      <div
        className="droppable-element"
        draggable
        unselectable="on"
        onDragStart={(e) => e.dataTransfer.setData("text/plain", "")}
      >
        Droppable Element (Drag me!)
      </div>

      <div className="mb-4" /*onClick={() => setSelectedItem(null)}*/>
        <ResponsiveReactGridLayout
          {...props}
          style={{ background: "#ffffff" }}
          layouts={layouts}
          measureBeforeMount={false}
          useCSSTransforms={mounted}
          compactType={compactType}
          preventCollision={!compactType}
          onLayoutChange={onLayoutChange}
          onBreakpointChange={onBreakpointChange}
          onDrop={onDrop}
          isDroppable
        >
          {generateDOM()}
        </ResponsiveReactGridLayout>
      </div>
    </>
  );
};

export default Dashboard;

Dashboard.defaultProps = {
  className: "layout",
  rowHeight: 8,
  onLayoutChange: (layout: any, layouts: any) => {},
  cols: { lg: 16, md: 12, sm: 8, xs: 4, xxs: 2 },
  breakpoints: { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
  containerPadding: [0, 0]
};

import React from "react";

interface TabsProps {
  selectedTabId?: string;
  children?: React.ReactNode;
  setSelectedTabId?: React.Dispatch<React.SetStateAction<string>>;
}

interface TabProps {
  id: string;
  isActive?: boolean;
  children?: React.ReactNode;
}

function Tab({ id, children, isActive }: TabProps) {
  const className = isActive
    ? " text-blue-600 hover:text-blue-600 border-blue-600"
    : " text-gray-500 hover:text-gray-600 border-gray-100 hover:border-gray-300";

  return (
    <li>
      <button
        data-id={id}
        type="button"
        className={`p-4 border-b-2 ${className}`}
      >
        {children}
      </button>
    </li>
  );
}

function Tabs({ children, selectedTabId, setSelectedTabId }: TabsProps) {
  const handleClick = (e: React.MouseEvent<HTMLUListElement>) => {
    const target = e.target as HTMLElement;

    if (setSelectedTabId && target.tagName === "BUTTON") {
      const selectedId = target.getAttribute("data-id") || "";
      setSelectedTabId(selectedId);
    }
  };

  return (
    <ul
      onClick={handleClick}
      className="flex flex-wrap -mb-px text-sm font-medium text-center"
    >
      {React.Children.map(children, (tab) => {
        if (React.isValidElement<TabProps>(tab) && tab.type === Tab) {
          return React.cloneElement(tab, {
            isActive: tab.props.id === selectedTabId,
          });
        }
        return tab;
      })}
    </ul>
  );
}

export { Tab, Tabs };

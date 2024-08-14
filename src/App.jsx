import React, { useState } from 'react';
import './App.css'; // Import the custom CSS file

const Dashboard = () => {
  const initialData = {
    categories: [
      {
        id: 'cspm_dashboard',
        name: 'CSPM Executive Dashboard',
        widgets: [
          { id: 'widget_1', name: 'Cloud Accounts', content: 'Random text for Widget 1' },
          { id: 'widget_2', name: 'Cloud Account Risk Assessment', content: 'Random text for Widget 2' },
          { id: 'widget_1', name: 'Cloud Accounts', content: 'Random text for Widget 1' },
        ]
      },
      {
        id: 'cwpp_dashboard',
        name: 'CWPP Dashboard',
        widgets: [
          { id: 'widget_3', name: 'Top 5 Namespace Specific Alerts', content: 'Random text for Widget 3' },
          { id: 'widget_4', name: 'Workload Alerts', content: 'Random text for Widget 4' },
          { id: 'widget_1', name: 'Cloud Accounts', content: 'Random text for Widget 1' },
        ]
      },
      {
        id: 'registry_scan',
        name: 'Registry Scan',
        widgets: [
          { id: 'widget_5', name: 'Image Risk Assessment', content: 'Random text for Widget 5' },
          { id: 'widget_6', name: 'Image Security Issues', content: 'Random text for Widget 6' },
          { id: 'widget_1', name: 'Cloud Accounts', content: 'Random text for Widget 1' },
        ]
      }
    ]
  };

  const [categories, setCategories] = useState(initialData.categories);
  const [widgetName, setWidgetName] = useState('');
  const [widgetContent, setWidgetContent] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const addWidgetToCategory = () => {
    if (!widgetName || !selectedCategoryId) return;

    const newWidget = {
      id: `widget_${Date.now()}`,
      name: widgetName,
      content: widgetContent
    };

    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === selectedCategoryId
          ? { ...category, widgets: [...category.widgets, newWidget] }
          : category
      )
    );

    setWidgetName('');
    setWidgetContent('');
    setSelectedCategoryId('');
  };

  const removeWidgetFromCategory = (categoryId, widgetId) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category.id === categoryId
          ? {
              ...category,
              widgets: category.widgets.filter(widget => widget.id !== widgetId)
            }
          : category
      )
    );
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: category.widgets.filter(widget =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }));

  return (
    <div className="dashboard-container">
      
      
      <div className="dashboard-header">
      <h1 className="dashboard-title">CNAPP Dashboard</h1>
      <div className="header">
        <input
          type="text"
          className="search-input"
          placeholder="Search widgets..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button className="open-panel-button " onClick={() => setIsPanelOpen(true)}>
          + Add Widget
        </button>
      </div>

      </div>
      
      {filteredCategories.map(category => (
        <div key={category.id} className="category-container">
          <h2 className="category-title">{category.name}</h2>
          <div className="widget-container">
            {category.widgets.map(widget => (
              <div key={widget.id} className="widget">
                <h3 className="widget-title">{widget.name}</h3>
                <p className="widget-content">{widget.content}</p>
                <button
                  className="remove-widget-button"
                  onClick={() => removeWidgetFromCategory(category.id, widget.id)}
                >
                  ✖
                </button>
              </div>
            ))}
           
          </div>
        </div>
      ))}

      {isPanelOpen && (
        <div className="side-panel">
          <div className="side-panel-header">
            <h2>Add Widget</h2>
            <button className="close-panel-button" onClick={() => setIsPanelOpen(false)}>
              ✖
            </button>
          </div>
          <div className="add-widget-form">
            <input
              type="text"
              placeholder="Widget Name"
              value={widgetName}
              onChange={e => setWidgetName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Widget Content"
              value={widgetContent}
              onChange={e => setWidgetContent(e.target.value)}
            />
            <select
              value={selectedCategoryId}
              onChange={e => setSelectedCategoryId(e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button onClick={addWidgetToCategory}>+ Add Widget</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;



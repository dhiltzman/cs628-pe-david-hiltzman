# CS628 Full-Stack Development - Web
# Term: Spring 2026
# Author: David Hiltzman
# Assignment: PE03

## Overview

The input-process-output (IPO) model is a widely used approach in systems analysis and software engineering for describing the structure of an information processing program or another process. Many introductory programming and systems analysis texts introduce this as the most basic structure for describing a process.

## Discussion

A computer program or any other sort of process using the input-process-output model receives inputs from a user or other source, does some computations on the inputs, and returns the results of the computations. The system divides the work into three categories:

- A requirement from the environment (input)
- A computation based on the requirement (process)
- A provision for the environment (output)

### Example: React ToDo List App

This application is a task management tool built with React. Users can add tasks to a list, mark them as complete by toggling a checkbox, and remove them using a delete button. State is managed entirely with the `useState` hook, and the UI updates reactively with every interaction.

The app is split into three components:
- `App.js` - holds all state and event handlers, renders the input row and stats line
- `todolist.js` - receives the todos array as props and maps over it to render each item
- `todoitem.js` - renders a single task with a checkbox, text, and delete button

Following the IPO model, the program must:

1. **Input** - The user types a task description into the text input field and clicks "Add Task" (or presses Enter)
2. **Process** - The `addTodo` function reads the input, creates a new todo object with a unique `id` via `Date.now()`, and updates the `todos` state array using `setTodos`; `toggleTodo` flips a task's `done` boolean; `deleteTodo` filters the task out of state
3. **Output** - The updated `todos` array is passed to `TodoList`, which re-renders the list with the new or modified task reflected in the UI, including a live completed/total stats counter

## Pseudocode

```
Component App
    Declare todos = [] (state)
    Declare input = "" (state)

    Function addTodo
        If input is not empty
            Append { id: timestamp, text: input, done: false } to todos
            Reset input to ""
        End If
    End Function

    Function deleteTodo(id)
        Assign todos = todos filtered where todo.id !== id
    End Function

    Function toggleTodo(id)
        Assign todos = todos mapped where matching todo.done is flipped
    End Function

    Output input field, Add Task button
    Output stats line (completedCount of todos.length completed)
    Output TodoList passing todos, onDelete, onToggle

Component TodoList (todos, onDelete, onToggle)
    If todos is empty
        Output "No tasks yet" message
    Else
        For each todo in todos
            Output TodoItem passing todo, onDelete, onToggle
        End For
    End If

Component TodoItem (todo, onDelete, onToggle)
    Output checkbox (checked = todo.done, onChange calls onToggle)
    Output todo.text (strikethrough if done)
    Output Delete button (onClick calls onDelete)
```

## Output

```
- Empty state: "No tasks yet. Add one above!" message is shown
- After adding tasks:
    [ ] Buy groceries
    [x] Review React useState hook    <- strikethrough, checkbox checked
    [ ] Submit assignment
    1 of 3 completed
- After clicking Delete on a task, it is removed from the list immediately
```
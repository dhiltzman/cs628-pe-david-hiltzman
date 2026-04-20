# CS628 Full-Stack Development - Web
# Term: Spring 2026
# Author: David Hiltzman
# Assignment: PE01

## Overview
The input-process-output (IPO) model is a widely used approach in systems analysis and software engineering for describing the structure of an information processing program or another process. Many introductory programming and systems analysis texts introduce this as the most basic structure for describing a process.

## Discussion
A computer program or any other sort of process using the input-process-output model receives inputs from a user or other source, does some computations on the inputs, and returns the results of the computations. The system divides the work into three categories:

- A requirement from the environment (input)
- A computation based on the requirement (process)
- A provision for the environment (output)

### Example: React Resume Application
This program renders a personal resume as a structured, styled React web application. It accepts static data defined directly in the component (professional history, education, skills, and projects), organizes that data into clearly delineated sections using JSX, and outputs a fully styled, browser-rendered HTML page representing a professional resume.

Following the IPO model, the program must:
1. **Input:** Accept structured personal data (name, contact info, work experience, education, projects, and skills) defined as static content within the React component.
2. **Process:** Render the data using React's component model, applying CSS class-based styles to structure the layout into semantic sections (header, education, experience, projects, skills).
3. **Output:** Display a formatted, readable resume page in the browser with consistent typography, color theming, and section hierarchy.

## Pseudocode
```
Function Resume
    // Renders a personal resume as a structured React component

    Declare string name = "David Hiltzman"
    Declare string contactInfo = "Lynnwood, WA | phone | email | github | linkedin"

    Declare array educationList = [
        { degree, institution, date },
        ...
    ]

    Declare array experienceList = [
        { title, company, dates, bulletPoints[] },
        ...
    ]

    Declare array projectsList = [
        { title, date, description },
        ...
    ]

    Declare array skillsList = [
        { category, items[] },
        ...
    ]

    Output <header> containing name and contactInfo
    Output <section> for each educationList entry
    Output <section> for each experienceList entry with nested bullet points
    Output <section> for each projectsList entry
    Output <section> for skillsList categories and items
End
```

## Output
```
David Hiltzman
Lynnwood, WA | (918) 352-8354 | david.hiltzman@gmail.com | github.com/dhiltzman | linkedin.com/in/david-hiltzman

Education
  Master of Science in Computer Science
  City University of Seattle | Expected May 2025

  Bachelor of Science in Computer Science
  Oklahoma State University | December 2022

  Study Abroad
  Hochschule Augsburg, Germany | February 2018 - August 2018

Professional Experience
  Systems Reliability Engineer II
  Blue Origin, Kent, WA | March 2026 - Present
    - Build and maintain automations within Coupa and Vroozi...
    - Monitor system performance via Datadog...
    - Design audit and compliance metrics...
    - Collaborate with cross-functional teams...

  [Additional experience entries rendered below...]

Projects
  GeoBuzz Mobile Application | August 2024
  weCAPTCHA for Stanford's Treehacks Hackathon 2021 | February 2021
  Automated Super Air Meter | December 2020 - April 2021

Technical Skills
  Languages & Frameworks: AWS, Bash, C, C#, C++, CSS, HTML, Java, JavaScript,
    Linux, PowerShell, Python, React, Redux, Rust
  Work Management: Agile, SDLC, CI/CD, Git, Jira
  CAD Software: SolidWorks, Autodesk Inventor, AutoCAD
  Fabrication: Additive, Rapid Prototyping, CNC Operation, Embedded Systems
  Certifications: Front End Developer, HTML Developer, CSS Developer,
    JavaScript Developer, SolidWorks Associate, Six Sigma Green Belt,
    Part 107 Remote Pilot
```

## Flowchart
```
[Start]
    |
    v
Load React App (index.js renders <Resume />)
    |
    v
Resume component initializes with static data
    |
    v
Render <header> with name and contact info
    |
    v
Render <section> Education
    |
    v
Render <section> Professional Experience
  (loop through each role, render title, company, dates, bullet points)
    |
    v
Render <section> Projects
  (loop through each project, render title, date, description)
    |
    v
Render <section> Technical Skills
    |
    v
Apply Resume.css styles to all elements
    |
    v
[Display formatted resume in browser]
    |
    v
[End]
```

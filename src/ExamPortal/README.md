This folder contains the Exam Portal implementation copied from the `examportal` project.

How to run / integrate

- Option A (quick preview):
  1. Replace the root `src/App.jsx` with the file `src/ExamPortal/App.jsx` (or import and render `<ExamPortalApp/>` from the root `App.jsx`).
  2. Ensure Tailwind CSS is configured in the project (Vignancet_Frontend already has `tailwind.config.js` and `postcss.config.js`).
  3. Run `npm run dev`.

- Option B (side-by-side):
  1. Import the ExamPortal component from `src/ExamPortal/App.jsx` inside your existing `src/App.jsx` and render it from a route or a button.

Notes
- The exam portal expects Tailwind CSS classes and the usual React setup.
- Mock data is available at `src/ExamPortal/data/mockData.js` (80 math, 40 physics, 40 chemistry).
- If you want, I can automatically wire the root `src/App.jsx` to show the exam portal instead of the current login flow.

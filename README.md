# Frontend Task

This repository is my implementation of a technical test for an EdTech company.

## Requirements

### UI/UX requirements

- [x] The solution should lock once all correct answers have been selected so the toggles can no longer be switched
- [x] The toggles should animate between the two states (see attached video)
- [x] The background colour should change in proportion to how "correct" the answer is (see video attached)
- [x] The component should be responsive down to screens 320px wide

### Project requirements

- [ ] State any assumptions or limitations of your solution in the repository readme
- [ ] Host your solution in a Git repo on Github or Gitlab & email us the link once you are done
- [x] Please implement your solution in React + Typescript. You may choose any other tools and technologies as you see appropriate
- [ ] The component should be reusable & extendable, it should be able to accommodate the question changing from that in the video to eg.:
  > Q. "What are the ideal conditions inside an office?" A. (good pay, bad pay) (lot of meetings, less meetings), (free coffee, expensive coffee), (bear in office, dog in office).

### What we are looking for

- A high-quality bar and close attention to detail
- This applies both to the UI/UX and to the quality of the code
- The code should be readable and maintainable by teammates
- The component should meet all the requirements listed above
- Although this task is for a small, one-off component, try to imagine it as part of a wider application and codebase, and structure your code accordingly
- You should be able to explain and back up any decisions made regarding your solution
- Have fun with it, and don’t be afraid to learn something new! :)

### Extension tasks

- [ ] The order of the questions & answer positions should be randomised
- [ ] Your solution should be able to accommodate answers with both two and three toggle positions in the answers. For example: Q. "Which are the best sports people & teams?" A. (Liverpool, Chelsea, Man Utd), (Serena Williams, Naomi Osaka)
- [ ] You should make it easy to switch between the active question

### Notes

Data structure affects architecture, how I structure that defines where to check for true answers.

---

Bug - A user can continuously click one correct answer and increment the total counter. This means they don't need to get them all correct.

This could be fixed by disabling changes if an answer is already selected.

Yeah, that fixed it, see the outer if here:

```ts
// Check if the answer is selected already
if (selectedIndex != index) {
  // Check whether the new selected answer correct
  if (answerObj.correct) {
    currentCorrect++;
  } else {
    currentCorrect--;
  }
}
```

---

Change to how I moved the slider, original:

```ts
let newIndex = selectedIndex + 1;
let newIndex = selectedIndex + 1;

if (newIndex > answerArr.length - 1) {
  newIndex = 0;
}

setSelectedIndex(newIndex);
```

updated to:

```ts
setSelectedIndex(index);
```

The advantage is that the slider will move right to the chosen answer rather than sequentially from left to right. Scalable UI for >2 answers.

---

Building the slider:

1. I drafted out an idea of the structure on tldraw
1. I watched a couple videos on how other people had done similar things. Neither was exactly what I wanted but I was able to understand the principles they were using to then implement my own solution. [One was a light / dark toggle with no text inside. The other was a similar toggle with text tabs built in raw html,js and tailwind].
1. The slider is an overlay which has position absolute and width is dynamically set based on how many answers there are. The same dynamic width is used on each answer element.
1. I'm using a transform on an inline style to translateX based on a distance calculated referencing the container. -- I wonder if I could use a tailwind `translate-x-[${translationDist}px]` instead...
1. I used useRef on the parent container to get its current width, within a useEffect which keeps the value up to date and responds to changes in the sizing of the window

---

Todo:

- Responsive design for 320px screens
- Random question order, random answer order (math.random in the subcomponent)
- Next question & dynamic rendering for any object
- Dynamic colours for any length of answer set
- Fix types

---

A thought: the structure of the data assumes that only one answer will be marked as correct. This would be need to be validated elsewhere or allows for multiple correct answers.

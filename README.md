# Notes

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

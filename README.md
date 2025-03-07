# Notes

Data structure affects architecture, how I structure that defines where to check for true answers.

---

Bug - A user can continuously click one correct answer and increment the total counter. This means they don't need to get them all correct.

This could be fixed by disabling changes if an answer is already selected.

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

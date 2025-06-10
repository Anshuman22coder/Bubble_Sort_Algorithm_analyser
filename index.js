// Assuming you already have 10 divs like <div class="box0"><p></p></div> to <div class="box9"><p></p></div>

let arr = [10, 9, 8, 7, 6, 5, 4, 3, 2, 1];

// Initial positioning of boxes
for (let i = 0; i < arr.length; i++) {
  const box = document.querySelector(`.box${i}`);
  box.style.left = `${i * 60}px`; // Set initial position
  box.querySelector("p").innerText = arr[i];
}

// Async Bubble Sort function
async function bubbleSort( i_gap,j_gap ) {
  let j=0;
  for (let i = 0; i < arr.length; i++) {
    for ( j = 0; j < arr.length - i - 1; j++) {
      let box1 = document.querySelector(`.box${j}`);
      let box2 = document.querySelector(`.box${j + 1}`);

      // Highlight boxes being compared
      box1.style.backgroundColor = "red";
      box2.style.backgroundColor = "green";

      await new Promise(resolve => setTimeout(resolve, j_gap>0?j_gap*1000:300)); // pause for visibility,, arrow function taking resolve as an input, and after 0.3secs, finish the promise,

      if (arr[j] > arr[j + 1]) {
        // Swap values in array
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

        // Animate the movement
        await Promise.all([  // all the promises when resolved then the cursor will get pass on to the next set of code..
          gsap.to(box1, { x: "+=60", duration: 0.3 }),
          gsap.to(box2, { x: "-=60", duration: 0.3 })
        ]);

        // Swap class names to update references
        box1.classList.replace(`box${j}`, `box_temp`);
        box2.classList.replace(`box${j + 1}`, `box${j}`);
        document.querySelector(`.box_temp`).classList.replace(`box_temp`, `box${j + 1}`);
      }

      // Revert colors
      box1.style.backgroundColor = "";
      box2.style.backgroundColor = "";  //removes the inline bg-color applied in js..
    }
   await new Promise(resolve => setTimeout(resolve, i_gap>0?i_gap*1000:3000)); // pause for visibility


    // Mark the last sorted element
    let sortedBox = document.querySelector(`.box${j}`);
    sortedBox.style.backgroundColor = "brown";
  }
}
let submit=document.getElementById("submit")
let i_gap;
let j_gap
submit.addEventListener("submit",function(e)
{
  e.preventDefault();
 i_gap = document.getElementById("i_speed_gap").value;
 j_gap = document.getElementById("j_speed_gap").value;
 
})



let button=document.getElementById("start");
button.addEventListener("click",()=>
{
  bubbleSort(i_gap,j_gap);
})
button.addEventListener("dblclick",()=>
{
  window.location.reload()
})
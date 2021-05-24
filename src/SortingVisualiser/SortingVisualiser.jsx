import React from 'react';
import './SortingVisualiser.css';
import * as sortingAlgorithms from '../sortingAlgorithms/sortingAlgorithms';

const ANIMATION_SPEED_MS = 5;
const PRIMARY_COLOR = 'cornflowerblue';
const SECONDARY_COLOR = 'red';

export default class SortingVisualiser extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            array: [],
            maxArraySize: 250,
            arraySize: 250
        };

        this.handleSliderInput = this.handleSliderInput.bind(this);
    }

    componentDidMount(){
        this.resetArray();
    }

    resetArray(){
        const size = this.state.arraySize;
        const array = [];
        for(let i = 0; i < size; i++){
            array.push(randomIntFromInterval(5, 500));
        }
        this.setState({array});
    }

    handleSliderInput(event) {
        let size = event.target.value;
        this.setState({arraySize: size}, () => {
            this.resetArray();
        });
    }

    animateAlgorithm(animations) {
        for(let i = 0; i < animations.length; i++){
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;

            if(isColorChange){
                const [barOneIndex, barTwoIndex] = animations[i];
                const barOneStyle = arrayBars[barOneIndex].style;
                const barTwoStyle = arrayBars[barTwoIndex].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            }else{
                setTimeout(() => {
                    const [barOneIndex, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIndex].style;
                    barOneStyle.height = `${newHeight}px`;
                },  i * ANIMATION_SPEED_MS); 
            }
        }
    }

    mergeSort() {
        const animations = sortingAlgorithms.mergeSort(this.state.array);
        this.animateAlgorithm(animations);
    }

    quickSort() {

    }

    heapSort() {

    }

    bubbleSort() {

    }

    testOrder() {
        const {array} = this.state;
        let flag = true;
        for(let i = 0; i < array.length - 1; i++){
            
            if(array[i] > array[i+1]){
                flag = false;
            }
            // console.log(i, array[i], array[i+1], array[i] > array[i+1], flag);
        }
        console.log(flag);
    }

    // testSortingAlgorithms(){
    //     for(let i = 0; i < 100; i++){
    //         const array = [];
    //         const length = randomIntFromInterval(1, 1000);
    //         for(let j = 0; j < length; j++){
    //             array.push(randomIntFromInterval(-1000, 1000));
    //         }

    //         const jsSortedArray = this.state.array.slice().sort((a, b) => {return a - b});
    //         const mergeSortedArray = sortingAlgorithms.mergeSort(this.state.array);
    //         // console.log(jsSortedArray);
    //         // console.log(sortedArray);
    //         console.log(arraysAreEqual(jsSortedArray, mergeSortedArray));
    //     }
    // }

    render(){
        const {array, maxArraySize, arraySize} = this.state;

        return (
            <>
                <div className="header">
                    <button onClick={() => this.resetArray()}>Generate New Array</button>
                    <input type="range" min="4" max={maxArraySize} value={arraySize} onChange={this.handleSliderInput} />
                    <button onClick={() => this.mergeSort()}>Merge Sort</button>
                    <button onClick={() => this.quickSort()}>Quick Sort</button>
                    <button onClick={() => this.heapSort()}>Heap Sort</button>
                    <button onClick={() => this.bubbleSort()}>Bubble Sort</button>
                    <button onClick={() => this.testOrder()}>Test Order</button>
                    {/* <button onClick={() => this.testSortingAlgorithms()}>Test Sorting Algorithms</button> */}
                </div>
                <div>Size: {arraySize}</div>
                <div className="array-container">
                {array.map((value, i) => (
                    <div className="array-bar" key={i} style={{height: `${value}px`}}></div>
                ))}
                </div>
            </>
        );
    }
}

function randomIntFromInterval(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}

// function arraysAreEqual(arrayOne, arrayTwo) {
//     if(arrayOne.length !== arrayTwo.length) return false;
//     for(let i = 0; i < arrayOne.length; i++){
//         if(arrayOne[i] !== arrayTwo[i]) return false;
//     }
//     return true;
// }
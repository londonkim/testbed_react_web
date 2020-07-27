
import { observable, reaction, computed, autorun } from 'mobx'

// Observable State 
// Mobx 객체는 이 객체가 변화화면 바로 탐지할수 있다.
const calculator = observable({
    a: 1,
    b: 2
})


// 특정 값이 바뀔 때 특정 작업하기
reaction(
    () => calculator.a, (value, reaction) => {
        console.log(`a값이 ${value} 로 바뀌었네요!`)
    }
)


reaction(
    () => calculator.b,
    (value) => {
        console.log(`b값이 ${value} 로 바뀌었네요!`)
    }
)


calculator.a = 10
calculator.b = 20


// computed로 특정 값 캐싱
const sum = computed(() => {
    console.log('계산중이예요!')
    return calculator.a + calculator.b
})

sum.observe(() => calculator.a)
sum.observe(() => calculator.b)

calculator.a = 20
calculator.b = 30

// 여러번 조회 해도 캐싱된 값이 불러온다.
console.log(sum.value)
console.log(sum.value)
// 여러번 조회 해도 캐싱된 값이 불러온다.
console.log(sum.value);
console.log(sum.value);

// 내부의 값이 바뀌면 다시 호출 함
calculator.a = 20
console.log(sum.value)



// computed로 특정 값 캐싱
const minus = computed(() => {
    console.log('뺄샘 계산중이예요')
    return calculator.a - calculator.b
})

// autorun은 reaction이나 computed의 observe 대신에 사용 될 수 있다. autorun 함수에서 사용되는 값이 있으면 자동으로 그 값을 주시한다.
// 만약에 computed로 만든 값의 .get()함수를 호출하면 개별로 observe() 안해도 된다.
autorun(() => console.log(`@@@ a 값이 ${calculator.a} 로 바뀌었네요!`))
autorun(() => console.log(`@@@ b 값이 ${calculator.b} 로 바뀌었네요!`))
autorun(() => minus.get())

calculator.a = 11
calculator.b = 12


// 캐시된 값ㅇ 불러온다
console.log(minus.value);
console.log(minus.value);

calculator.a = 20;

// 값이 변경되면 다시 계산한다.
console.log(minus.value);
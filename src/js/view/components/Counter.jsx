import { useSelector, useDispatch } from 'react-redux';
import {increment, decrement} from "../../model/data/counterData.js";

function Counter() {
    const dispatch = useDispatch();
    const count = useSelector(state => state.counterRepository.value);
    const status = useSelector(state => state.counterRepository.status);
    const error = useSelector(state => state.counterRepository.error);

    return (
        <div>
            <button onClick={() => dispatch(decrement())}>-</button>
            <span>{count}</span>
            <button onClick={() => dispatch(increment())}>+</button>
            {status === "loading" && <p>Loading...</p>}
            {status === "failed" && <p>Error: {error}</p>}
        </div>
    );
}

export default Counter;

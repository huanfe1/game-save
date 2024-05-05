import { useParams } from 'react-router-dom';

export default function Game() {
    const param = useParams();
    return <div>{param.id}</div>;
}

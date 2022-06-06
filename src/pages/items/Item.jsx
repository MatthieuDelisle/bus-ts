import '../styles/Item.css'

function Item(props){
    const text = props.text;
    const data = props.data;
    return <div className='lmj-item'>
        <div className = 'lmj-item-name'>
            <br></br>
            {text}

            <div className = 'lmj-data-name'>
                <br></br><br></br>
                {data}

            </div>

            </div>
        
        </div>;
}

export default Item
import "./index.css"

const Pagination = props => {
    const {pageNo, totalPages, onClickPrev, onClickNext} = props
    const onClickPrevButton = () => onClickPrev()
    const onClickNextBUtton = () => onClickNext()

    return (
        <div className="pagination-container">
            <button type="button" className="previous-button" onClick={onClickPrevButton}>Prev</button>
            <div className="page-container">
                <p className="page-text">{pageNo} / {totalPages}</p>
            </div>
            <button type="button" className="previous-button" onClick={onClickNextBUtton}>Next</button>
        </div>
    )
}

export default Pagination
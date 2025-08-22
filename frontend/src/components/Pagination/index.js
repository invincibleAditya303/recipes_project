const Pagination = props => {
    const {page, total, onClickPrev, onClickNext} = props
    const onClickPrevButton = () => onClickPrev()
    const onClickNextBUtton = () => onClickNext()

    return (
        <div className="w-[11vw] h-[3vh] flex items-center justify-between">
            <button type="button" className="px-3 py-1 bg-blue-500 text-white rounded disabled:opacity-50 hover:bg-blue-600 transition-colors" onClick={onClickPrevButton}>Prev</button>
            <div className="w-[2vw] h-[full]">
                <p className="text-gray-700">{page} / {total}</p>
            </div>
            <button type="button" className="previous-button" onClick={onClickNextBUtton}>Next</button>
        </div>
    )
}

export default Pagination
const Home = props => {

    const onClickRecipes = () => {
        const {history} = props
        history.replace('/api/recipes?page=1&limit=10')
    }

    return (
        <div className="w-[100vw] h-[100vh] flex felx-col items-center justify-between">
            <h1 className="text-4xl font-serif font-bold leading-tight tracking-tight text-gray-900">Welcome to Recipes Site</h1>
            <button type="button" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onClickRecipes}>Recipes</button>
        </div>
    )
}

export default Home
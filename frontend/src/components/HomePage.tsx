import Header from "./Header";
import TrendingMovies from "./TrendingMovies";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center">
      <Header />
      <div className="w-full max-w-4xl">
        <TrendingMovies />
      </div>
    </div>
  )
}
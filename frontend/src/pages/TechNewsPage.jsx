import { NewspaperIcon } from "lucide-react";
import { useContext, useEffect } from "react";
import PageHeader from "../components/pageHeader/PageHeader";
import NewsFilter from "../components/News/NewsFilter";
import NewsCard from "../components/News/NewsCard";
import axios from "axios";
import { AppContext } from "../context/AppContext";

const BASE_URL = "https://newsdata.io/api/1/latest";
const API_KEY = import.meta.env.VITE_API_KEY;

const TechNewsPage = () => {
  const { news, setNews, searchQuery } = useContext(AppContext);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const params = new URLSearchParams({
          apikey: API_KEY,
          language: "en",
          category: "technology",
          size: "10",
        });

        if (searchQuery) {
          params.append("q", searchQuery.trim());
        } else {
          params.append(
            "q",
            "technology OR software OR AI OR programming OR startup"
          );
        }

        const url = `${BASE_URL}?${params}`;
        const { data } = await axios.get(url);

        if (data.status === "success") {
          setNews(data.results);
        }
      } catch (error) {
        console.error("Failed to fetch news:", error);
      }
    };

    fetchNews();
  }, [searchQuery, setNews]);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-12 ml-0 md:ml-64">
      <PageHeader
        Icon={NewspaperIcon}
        title="Tech News"
        description="Stay updated with the latest in tech and development"
      />

      <NewsFilter />

      <div className="flex flex-col gap-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Latest News</h1>
          <span className="text-gray-400">{news.length} articles found</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {news.length > 0 ? (
            news.map((article) => (
              <NewsCard key={article.article_id} article={article} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No news articles found. Try a different search.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TechNewsPage;

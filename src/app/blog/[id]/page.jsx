"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calendar, User, ArrowLeft, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

const blogPostsData = {
  1: {
    title: "10 JavaScript Tips That Will Make You a Better Developer",
    author: "Najmiddin Abdurahmonov",
    date: "Jan 5, 2026",
    readTime: "8 min read",
    image: "📝",
    category: "JavaScript",
    content: `
      <h2>Introduction</h2>
      <p>JavaScript is one of the most versatile programming languages, and mastering it can significantly improve your development skills. In this article, we'll explore 10 practical tips that will make you a better JavaScript developer.</p>

      <h2>1. Use const and let Instead of var</h2>
      <p>The var keyword has function scope, which can lead to unexpected behavior. Always prefer const for variables that won't be reassigned, and let for variables that will change. This prevents bugs and makes your code more predictable.</p>

      <h2>2. Master Array Methods</h2>
      <p>Methods like map(), filter(), reduce(), and find() are powerful tools for working with arrays. Understanding these functional programming techniques will make your code more concise and readable.</p>

      <h2>3. Understand Closures</h2>
      <p>Closures are a fundamental concept in JavaScript. They allow functions to access variables from their outer scope. Mastering closures helps you write better code and avoid common pitfalls.</p>

      <h2>4. Use Async/Await for Cleaner Code</h2>
      <p>Instead of callback hell or promise chains, use async/await syntax for cleaner, more readable asynchronous code. It makes error handling simpler with try/catch blocks.</p>

      <h2>5. Know Your Destructuring Techniques</h2>
      <p>Destructuring allows you to extract values from objects and arrays concisely. This modern syntax makes your code cleaner and more maintainable.</p>

      <h2>6. Learn Regular Expressions</h2>
      <p>Regular expressions are powerful for pattern matching and string manipulation. While they can be complex, investing time to learn them will save you hours of coding.</p>

      <h2>7. Understand Prototypal Inheritance</h2>
      <p>JavaScript uses prototypal inheritance, not classical inheritance. Understanding how the prototype chain works is crucial for writing efficient code.</p>

      <h2>8. Use Template Literals</h2>
      <p>Template literals (backticks) make string concatenation much cleaner and support multi-line strings and interpolation. Use them instead of string concatenation.</p>

      <h2>9. Master Error Handling</h2>
      <p>Proper error handling is essential for robust applications. Use try/catch blocks, create custom error classes, and provide meaningful error messages.</p>

      <h2>10. Keep Learning and Practice</h2>
      <p>JavaScript is constantly evolving. Stay updated with new features, practice regularly, and contribute to open-source projects to continuously improve your skills.</p>

      <h2>Conclusion</h2>
      <p>These 10 tips will help you become a better JavaScript developer. Remember that mastery comes with practice and continuous learning. Keep coding and exploring new concepts!</p>
    `
  },
  2: {
    title: "React Hooks Deep Dive: useEffect and useState",
    author: "Youssef Ali",
    date: "Jan 3, 2026",
    readTime: "12 min read",
    image: "⚛️",
    category: "React",
    content: `
      <h2>Understanding React Hooks</h2>
      <p>React Hooks revolutionized the way we write React components by allowing us to use state and other React features without writing class components. In this article, we'll explore two of the most important hooks: useState and useEffect.</p>

      <h2>useState Hook</h2>
      <p>The useState hook allows you to add state to functional components. It returns an array with two elements: the current state value and a function to update it. Understanding how to properly manage state is crucial for building interactive applications.</p>

      <h2>useEffect Hook</h2>
      <p>useEffect is used for side effects in functional components. It replaces lifecycle methods like componentDidMount and componentDidUpdate. Proper dependency management in useEffect is essential to avoid performance issues.</p>

      <h2>Common Pitfalls and Solutions</h2>
      <p>Learn how to avoid common mistakes when using React hooks, such as missing dependencies, stale closures, and infinite loops. We'll explore best practices for writing efficient hooks.</p>

      <h2>Custom Hooks</h2>
      <p>You can create your own custom hooks to extract component logic and reuse it across multiple components. This powerful pattern helps you write DRY (Don't Repeat Yourself) code.</p>

      <h2>Performance Optimization</h2>
      <p>Learn how to optimize your React components using hooks like useMemo and useCallback to prevent unnecessary re-renders and improve application performance.</p>

      <h2>Conclusion</h2>
      <p>Mastering React hooks is essential for modern React development. Practice using them in your projects and explore the React documentation for more advanced patterns.</p>
    `
  },
  3: {
    title: "Building Scalable Node.js Applications",
    author: "Fatima Hassan",
    date: "Dec 28, 2025",
    readTime: "15 min read",
    image: "🚀",
    category: "Node.js",
    content: `
      <h2>Introduction to Scalable Architecture</h2>
      <p>Building scalable Node.js applications requires careful planning and understanding of best practices. In this comprehensive guide, we'll explore strategies for creating applications that can handle growth.</p>

      <h2>Modular Code Structure</h2>
      <p>Organize your code into modules and maintain clear separation of concerns. This makes your codebase easier to test, maintain, and scale.</p>

      <h2>Database Optimization</h2>
      <p>Proper database design and query optimization are crucial for scalability. Use indexes wisely, avoid N+1 queries, and consider caching strategies.</p>

      <h2>Load Balancing and Clustering</h2>
      <p>Learn how to distribute load across multiple Node.js processes using clustering. This allows you to utilize multi-core processors effectively.</p>

      <h2>Caching Strategies</h2>
      <p>Implement caching at multiple levels - application level, database level, and HTTP caching. Redis is a popular choice for distributed caching.</p>

      <h2>Monitoring and Logging</h2>
      <p>Implement comprehensive logging and monitoring to track application health and identify performance bottlenecks. Tools like Winston and DataDog are invaluable.</p>

      <h2>Conclusion</h2>
      <p>Scalability is not an afterthought but a core consideration in application design. Follow these best practices to build Node.js applications that can grow with your business.</p>
    `
  }
};

export default function BlogPostPage({ params }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const unwrapParams = React.useCallback(async () => {
    const resolvedParams = await params;
    return resolvedParams.id;
  }, [params]);

  const [postId, setPostId] = React.useState(null);

  React.useEffect(() => {
    unwrapParams().then(setPostId);
  }, [unwrapParams]);

  const post = postId && blogPostsData[postId];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">Loading...</p>
        </div>
      </div>
    );
  }

  const handleLike = () => {
    if (!liked) {
      setLikes(likes + 1);
      setLiked(true);
    } else {
      setLikes(likes - 1);
      setLiked(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <Link href="/blog" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-semibold">
            <ArrowLeft className="h-5 w-5" />
            Back to Blog
          </Link>
        </div>
      </div>

    
      <div className="max-w-4xl mx-auto px-4 py-12">

        <div className="mb-12">
          <div className="text-6xl mb-6 text-center">{post.image}</div>
          
          <h1 className="text-5xl font-bold text-gray-900 mb-6">{post.title}</h1>

       
          <div className="flex flex-wrap items-center gap-6 text-gray-600 border-b border-gray-200 pb-6">
            <span className="inline-block bg-purple-100 text-purple-800 px-4 py-1 rounded-full font-semibold">
              {post.category}
            </span>
            <div className="flex items-center gap-2">
              <User className="h-5 w-5" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              <span>{post.date}</span>
            </div>
            <span>{post.readTime}</span>
          </div>
        </div>

       
        <div className="bg-white rounded-xl p-12 shadow-lg mb-12 prose prose-lg max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/<h2>/g, '<h2 class="text-3xl font-bold mt-8 mb-4 text-gray-900">').replace(/<p>/g, '<p class="text-gray-700 mb-4 leading-relaxed">') }} />
        </div>

    
        <div className="bg-white rounded-xl p-8 shadow-lg">
          <div className="flex items-center gap-8 border-b border-gray-200 pb-8">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-6 py-2 rounded-lg font-semibold transition ${
                liked
                  ? "bg-red-100 text-red-600"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <ThumbsUp className="h-5 w-5" />
              <span>{likes} Likes</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
              <MessageCircle className="h-5 w-5" />
              <span>Comments</span>
            </button>
            <button className="flex items-center gap-2 px-6 py-2 rounded-lg font-semibold bg-gray-100 text-gray-700 hover:bg-gray-200 transition">
              <Share2 className="h-5 w-5" />
              <span>Share</span>
            </button>
          </div>

          <div className="mt-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Comments</h3>
            <form className="mb-8">
              <textarea
                placeholder="Share your thoughts..."
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                rows="4"
              ></textarea>
              <button
                type="submit"
                className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition"
              >
                Post Comment
              </button>
            </form>
          </div>
        </div>

   
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">More Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((id) => (
              <Link key={id} href={`/blog/${id}`} className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="font-bold text-gray-900 mb-2">Interesting Article Title</h3>
                <p className="text-gray-600 text-sm">Explore more insights from our expert writers...</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

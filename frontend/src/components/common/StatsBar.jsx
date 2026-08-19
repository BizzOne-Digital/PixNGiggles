import { STATS } from '../../utils/pageContent';

const StatsBar = ({ className = '' }) => (
  <section className={`bg-black py-10 ${className}`}>
    <div className="container-custom">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="text-3xl font-extrabold text-gold sm:text-4xl">{stat.value}</p>
            <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-white/80 sm:text-sm">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default StatsBar;

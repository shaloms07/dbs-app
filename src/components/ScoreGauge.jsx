import { useEffect, useRef } from 'react';
import { getBand, scoreToAngle, scoreToStrokeDashOffset, SCORE_MAX } from '@constants/scoreBands';

export default function ScoreGauge({ score = 0, animated = true, size = 280 }) {
  const svgRef = useRef(null);
  const band = getBand(score);
  const angle = scoreToAngle(score);
  const dashOffset = scoreToStrokeDashOffset(score);

  useEffect(() => {
    if (animated && svgRef.current) {
      // Animate the active arc by transitioning the stroke-dashoffset
      const activeArc = svgRef.current.querySelector('.active-arc');
      if (activeArc) {
        // Start at full (no visible arc)
        activeArc.style.strokeDashoffset = '371';
        // Trigger reflow to apply the initial value
        void activeArc.offsetHeight;
        // Transition to final value
        activeArc.style.transition = 'stroke-dashoffset 1s ease-out';
        activeArc.style.strokeDashoffset = dashOffset;
      }

      // Animate needle rotation
      const needle = svgRef.current.querySelector('.needle');
      if (needle) {
        needle.style.transition = 'transform 1s ease-out';
        needle.style.transform = `rotate(${angle}deg)`;
      }
    }
  }, [animated, angle, dashOffset, score]);

  return (
    <div className="flex flex-col items-center justify-center">
      <svg
        ref={svgRef}
        viewBox="0 0 280 155"
        width={size}
        height={(size * 155) / 280}
        style={{ maxWidth: '100%', height: 'auto' }}
        role="img"
        aria-label={`Score ${score} out of ${SCORE_MAX}, ${band.label}`}
      >
        <defs>
          <linearGradient id="gradientArc" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
            <stop offset="25%" stopColor="#f97316" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#eab308" stopOpacity="0.3" />
            <stop offset="75%" stopColor="#3b82f6" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="25%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="75%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>

        {/* Background arc */}
        <path
          d="M 22 140 A 118 118 0 0 1 258 140"
          stroke="url(#gradientArc)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
        />

        {/* Active arc */}
        <path
          className="active-arc"
          d="M 22 140 A 118 118 0 0 1 258 140"
          stroke="url(#activeGradient)"
          strokeWidth="20"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="371"
          strokeDashoffset={!animated ? dashOffset : 371}
          style={{ transition: animated ? undefined : 'none' }}
        />

        {/* Needle */}
        <g
          className="needle"
          style={{
            transformOrigin: '140px 140px',
            transform: !animated ? `rotate(${angle}deg)` : 'rotate(0deg)',
          }}
        >
          {/* Needle shadow */}
          <line
            x1="140"
            y1="140"
            x2="140"
            y2="25"
            stroke="rgba(0,0,0,0.1)"
            strokeWidth="4"
            strokeLinecap="round"
          />
          {/* Needle */}
          <line
            x1="140"
            y1="140"
            x2="140"
            y2="25"
            stroke={band.color}
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* Needle dot */}
          <circle cx="140" cy="140" r="5" fill={band.color} />
        </g>

        {/* Score text */}
        <text
          x="140"
          y="128"
          textAnchor="middle"
          fontSize="52"
          fontWeight="900"
          fill="white"
          fontFamily="Nunito, sans-serif"
          style={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
        >
          {Math.round(score)}
        </text>

        {/* Score label */}
        <text
          x="140"
          y="143"
          textAnchor="middle"
          fontSize="13"
          fill="rgba(255,255,255,0.4)"
          fontFamily="Nunito, sans-serif"
        >
          /900
        </text>
      </svg>
    </div>
  );
}

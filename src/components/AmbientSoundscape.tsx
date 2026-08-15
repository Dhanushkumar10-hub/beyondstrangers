import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Sparkles, Wind, Flame, CloudRain } from 'lucide-react';

export type AtmosphereMode = 'forest' | 'campfire' | 'rain';

export const AmbientSoundscape: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [mode, setMode] = useState<AtmosphereMode>('forest');
  const [volume, setVolume] = useState(0.3);
  const [isOpen, setIsOpen] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const noiseNodeRef = useRef<AudioNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  // Initialize Web Audio procedural generator
  const startAudio = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      playModeSound(mode, ctx, masterGain);
      setIsPlaying(true);
    } catch (e) {
      console.warn('Web Audio API not supported or autoplay blocked:', e);
    }
  };

  const stopAudio = () => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const playModeSound = (currentMode: AtmosphereMode, ctx: AudioContext, masterGain: GainNode) => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }

    if (currentMode === 'forest') {
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(120, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();
      noiseNodeRef.current = whiteNoise;
    } else if (currentMode === 'campfire') {
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = output[i];
        output[i] *= 0.15;
      }

      const brownNoise = ctx.createBufferSource();
      brownNoise.buffer = noiseBuffer;
      brownNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, ctx.currentTime);

      brownNoise.connect(filter);
      filter.connect(masterGain);
      brownNoise.start();
      noiseNodeRef.current = brownNoise;

      intervalRef.current = window.setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') return;
        const now = audioCtxRef.current.currentTime;
        const osc = audioCtxRef.current.createOscillator();
        const popGain = audioCtxRef.current.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(Math.random() * 400 + 150, now);
        popGain.gain.setValueAtTime(0.06 * Math.random(), now);
        popGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.04);
        osc.connect(popGain);
        popGain.connect(masterGain);
        osc.start(now);
        osc.stop(now + 0.05);
      }, 160);
    } else if (currentMode === 'rain') {
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.04;
      }

      const rainNoise = ctx.createBufferSource();
      rainNoise.buffer = noiseBuffer;
      rainNoise.loop = true;

      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(1000, ctx.currentTime);
      bandpass.Q.setValueAtTime(0.8, ctx.currentTime);

      rainNoise.connect(bandpass);
      bandpass.connect(masterGain);
      rainNoise.start();
      noiseNodeRef.current = rainNoise;
    }
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
  };

  const handleModeChange = (newMode: AtmosphereMode) => {
    setMode(newMode);
    if (isPlaying && audioCtxRef.current && gainNodeRef.current) {
      playModeSound(newMode, audioCtxRef.current, gainNodeRef.current);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {isOpen && (
        <div className="mb-3 p-4 bg-white border border-[#E5E5E5] shadow-lg w-64 text-[#0A0A0A] animate-fade-in">
          <div className="flex items-center justify-between pb-3 border-b border-[#F0F0EE]">
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#666666]">
              ATMOSPHERE
            </div>
            <span className="text-[9px] bg-[#F7F7F5] text-[#555555] px-2 py-0.5 border border-[#E5E5E5]">
              SYNTH
            </span>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-1.5">
            <button
              onClick={() => handleModeChange('forest')}
              className={`flex flex-col items-center justify-center p-2 text-xs transition-all ${
                mode === 'forest'
                  ? 'bg-[#0A0A0A] text-white'
                  : 'bg-[#F7F7F5] text-[#555555] hover:bg-[#EAEAEA]'
              }`}
            >
              <Wind className="w-3.5 h-3.5 mb-1" />
              <span className="text-[10px] font-medium">Breeze</span>
            </button>
            <button
              onClick={() => handleModeChange('campfire')}
              className={`flex flex-col items-center justify-center p-2 text-xs transition-all ${
                mode === 'campfire'
                  ? 'bg-[#0A0A0A] text-white'
                  : 'bg-[#F7F7F5] text-[#555555] hover:bg-[#EAEAEA]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 mb-1" />
              <span className="text-[10px] font-medium">Campfire</span>
            </button>
            <button
              onClick={() => handleModeChange('rain')}
              className={`flex flex-col items-center justify-center p-2 text-xs transition-all ${
                mode === 'rain'
                  ? 'bg-[#0A0A0A] text-white'
                  : 'bg-[#F7F7F5] text-[#555555] hover:bg-[#EAEAEA]'
              }`}
            >
              <CloudRain className="w-3.5 h-3.5 mb-1" />
              <span className="text-[10px] font-medium">Rain</span>
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-[#F0F0EE] flex items-center gap-3">
            <span className="text-[9px] uppercase tracking-wider text-[#777777]">VOL</span>
            <input
              type="range"
              min="0.05"
              max="0.8"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-[#0A0A0A] bg-[#E5E5E5] h-1 rounded-none cursor-pointer"
            />
            <span className="text-[9px] font-mono text-[#666666] w-6 text-right">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}

      {/* Main Sound Trigger */}
      <div className="flex items-center gap-1 bg-white border border-[#E5E5E5] p-1 shadow-md">
        <button
          onClick={toggleAudio}
          className={`flex items-center gap-2 px-3 py-1.5 text-xs tracking-wider uppercase transition-all ${
            isPlaying
              ? 'bg-[#0A0A0A] text-white'
              : 'text-[#555555] hover:text-[#0A0A0A]'
          }`}
          aria-label={isPlaying ? 'Mute soundscape' : 'Play soundscape'}
        >
          {isPlaying ? (
            <>
              <Volume2 className="w-3.5 h-3.5 text-white" />
              <span className="text-[10px] font-medium">{mode}</span>
            </>
          ) : (
            <>
              <VolumeX className="w-3.5 h-3.5 text-[#777777]" />
              <span className="text-[10px] font-medium">Soundscape</span>
            </>
          )}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 hover:bg-[#F7F7F5] text-[#666666] hover:text-[#0A0A0A] transition-colors"
          title="Sound settings"
        >
          <Sparkles className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

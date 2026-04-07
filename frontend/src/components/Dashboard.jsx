import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Mic, Image as ImageIcon, Send, ShieldAlert, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

const Dashboard = () => {
  const [situationText, setSituationText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertStatus, setAlertStatus] = useState(null);

  const handleAnalyze = async () => {
    if (!situationText) return;
    setLoading(true);
    setAnalysis(null);
    setAlertStatus(null);
    
    try {
      // Geolocate
      let location = null;
      if ('geolocation' in navigator) {
        try {
          const pos = await new Promise((resolve, reject) => {
             navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        } catch (e) {
          console.log('Location access denied or failed');
        }
      }

      const response = await axios.post('http://localhost:5000/api/analyze', {
        text: situationText,
        location,
        hasImage: false
      });
      
      setAnalysis(response.data);
    } catch (err) {
      console.error(err);
      alert('Failed to analyze situation. Ensure backend is running and API key is set.');
    } finally {
      setLoading(false);
    }
  };

  const handleSOS = async () => {
    try {
      let location = null;
      if ('geolocation' in navigator) {
         try {
           const pos = await new Promise((resolve, reject) => navigator.geolocation.getCurrentPosition(resolve, reject));
           location = { lat: pos.coords.latitude, lng: pos.coords.longitude };
         } catch(e) {}
      }

      await axios.post('http://localhost:5000/api/alert', {
        situation: situationText || "Emergency triggered without text",
        location,
        riskLevel: analysis?.threatLevel || 'High'
      });
      setAlertStatus('SOS Alert Sent Successfully to Authorities!');
    } catch (err) {
      alert('Failed to trigger SOS.');
    }
  };

  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert("Your browser does not support Speech Recognition.");
      return;
    }
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    
    recognition.onstart = () => setIsRecording(true);
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      setSituationText(prev => prev ? prev + ' ' + text : text);
    };
    recognition.onerror = (e) => console.error(e);
    recognition.onend = () => setIsRecording(false);
    
    recognition.start();
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl">
      {/* Header */}
      <header className="flex justify-between items-center mb-10 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-slate-900 font-bold text-2xl shadow-lg shadow-yellow-500/20">
            2
          </div>
          <div>
            <h1 className="text-3xl font-bold">Women Safety</h1>
            <h2 className="text-xl text-slate-400">Analytics</h2>
          </div>
        </div>
        <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 text-slate-900 font-bold px-6 py-2 rounded-l-full shadow-lg">
          SECURITY
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Left Col: Input */}
        <div className="glass-panel p-6 rounded-2xl flex flex-col gap-6">
          <h3 className="text-xl font-semibold flex items-center gap-2">
            <Shield className="text-blue-400" /> Assess Your Surroundings
          </h3>
          
          <div className="relative">
            <textarea
              className="w-full bg-slate-900/50 border border-slate-700 rounded-xl p-4 min-h-[150px] text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
              placeholder="Describe your situation, what you see, or press the mic to speak..."
              value={situationText}
              onChange={(e) => setSituationText(e.target.value)}
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button 
                onClick={startSpeechRecognition}
                className={`p-3 rounded-full transition-colors ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-700 hover:bg-slate-600'}`}
                title="Speak"
              >
                <Mic size={20} />
              </button>
            </div>
          </div>

          <div className="flex gap-4">
            <button 
              onClick={handleAnalyze}
              disabled={loading || !situationText}
              className="flex-1 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-3 px-6 rounded-xl flex justify-center items-center gap-2 transition-colors"
            >
              {loading ? <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span> : <Send size={20} />}
              {loading ? 'Analyzing...' : 'Analyze Risk'}
            </button>
            <button className="bg-slate-800 hover:bg-slate-700 text-slate-300 p-3 rounded-xl transition-colors border border-slate-700" title="Upload Image (Beta)">
              <ImageIcon size={24} />
            </button>
          </div>
        </div>

        {/* Right Col: Results */}
        <div className="flex flex-col gap-6">
          
          {/* Analysis Result */}
          {analysis && (
            <div className="glass-panel p-6 rounded-2xl animate-fade-in">
               <div className="flex justify-between items-start mb-4">
                 <h3 className="text-xl font-semibold flex items-center gap-2">
                   <AlertTriangle className={analysis.threatLevel === 'High' ? 'text-red-500' : analysis.threatLevel === 'Medium' ? 'text-yellow-500' : 'text-green-500'} />
                   Risk Assessment
                 </h3>
                 <span className={`px-4 py-1 rounded-full font-bold text-sm ${analysis.threatLevel === 'High' ? 'bg-red-500/20 text-red-500' : analysis.threatLevel === 'Medium' ? 'bg-yellow-500/20 text-yellow-500' : 'bg-green-500/20 text-green-500'}`}>
                   {analysis.threatLevel} ({analysis.threatScore}/10)
                 </span>
               </div>
               <p className="text-slate-300 mb-6 pb-6 border-b border-slate-800">
                 {analysis.analysis}
               </p>
               
               <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                 <CheckCircle size={18} className="text-blue-400" /> AI Safety Tips
               </h4>
               <ul className="space-y-3">
                 {analysis.safetyTips?.map((tip, i) => (
                   <li key={i} className="flex gap-3 text-slate-300 bg-slate-800/30 p-3 rounded-lg border border-slate-800/50">
                     <span className="text-blue-400 font-bold">{i+1}.</span> {tip}
                   </li>
                 ))}
               </ul>
            </div>
          )}

          {/* SOS Button */}
          <div className="glass-panel p-6 rounded-2xl flex flex-col items-center justify-center text-center gap-4 mt-auto">
            <p className="text-slate-400 text-sm">In immediate danger? Do not wait for analysis.</p>
            <button 
              onClick={handleSOS}
              className="bg-red-600 hover:bg-red-500 text-white font-bold text-xl py-6 px-12 rounded-full shadow-[0_0_30px_rgba(220,38,38,0.5)] transition-all hover:scale-105 active:scale-95 flex items-center gap-3 w-full justify-center"
            >
              <ShieldAlert size={28} />
              SEND SOS ALERT
            </button>
            {alertStatus && (
              <p className="text-green-400 font-semibold bg-green-400/10 px-4 py-2 rounded-lg w-full mt-2 animate-pulse">
                {alertStatus}
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;

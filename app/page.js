import Board from '../components/Board'


export default function Home() {

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <div className="z-10 w-full items-center justify-between font-mono text-sm">
                <Board />
            </div>
        </main>
    )
}

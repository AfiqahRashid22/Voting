// SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

contract VotingSystem {
    // Address of the admin (contract deployer)
    address public admin;

    // Structs for voters and candidates
    struct Voter {
        string nationalId;
        bool registered;
        bool hasVoted;
    }

    struct Candidate {
        string name;
        string nationalId;
        uint256 votes;
        bool registered;
    }

    // Mappings to store voters and candidates by their national IDs
    mapping(string => Voter) public voters;
    mapping(string => Candidate) public candidates;

    // Arrays to store registered candidate IDs
    string[] private candidateIds;

    // Competition state variables
    bool public votingStarted = false;
    bool public votingEnded = false;

    /**
     * Constructor function to initialize admin as the deployer.
     */
    constructor() {
        admin = msg.sender;
    }

    // Modifier to restrict access to the admin only
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only Admin");
        _;
    }

    /************************** VOTER REGISTRATION ****************************/

    /**
     * Function to register a voter.
     * @param _nationalId The unique national ID of the voter.
     */
    function registerVoter(string memory _nationalId) public onlyAdmin {
        require(!voters[_nationalId].registered, "Voter already registered");

        voters[_nationalId] = Voter({
            nationalId: _nationalId,
            registered: true,
            hasVoted: false
        });
    }

    /************************ CANDIDATE REGISTRATION **************************/

    /**
     * Function to register a candidate.
     * @param _name The name of the candidate.
     * @param _nationalId The unique national ID of the candidate.
     */
    function registerCandidate(string memory _name, string memory _nationalId) public onlyAdmin {
        require(!candidates[_nationalId].registered, "Candidate already registered");
        candidates[_nationalId] = Candidate({
            name: _name,
            nationalId: _nationalId,
            votes: 0,
            registered: true
        });
        candidateIds.push(_nationalId);
    }

    /**
     * Function to get the list of registered candidates.
     */
    function getCandidates() public view returns (string[] memory) {
        return candidateIds;
    }

    /***************************** VOTING PROCESS *****************************/

    /**
     * Function to start the voting process.
     */
    function startVoting() public onlyAdmin {
        require(!votingStarted, "Voting already started");
        require(candidateIds.length >= 2, "At least two candidates required");
        votingStarted = true;
    }

    /**
     * Function to end the voting process.
     */
    function endVoting() public onlyAdmin {
        require(votingStarted, "Voting has not started");
        require(!votingEnded, "Voting already ended");
        votingEnded = true;
    }

    /**
     * Function to cast a vote.
     * @param _voterId The unique national ID of the voter.
     * @param _candidateId The unique national ID of the candidate.
     */
    function vote(string memory _voterId, string memory _candidateId) public {
        require(votingStarted && !votingEnded, "Voting is not active");
        require(voters[_voterId].registered, "Voter is not registered");
        require(!voters[_voterId].hasVoted, "Voter has already voted");
        require(candidates[_candidateId].registered, "Candidate does not exist");

        voters[_voterId].hasVoted = true;
        candidates[_candidateId].votes++;
    }

    /*********************** VOTE COUNT AND RESULTS **************************/

    /**
     * Function to get the winner of the election.
     * @return winnerName The name of the winning candidate.
     * @return voteCount The number of votes the winner received.
     */
    function getWinner() public view returns (string memory winnerName, uint256 voteCount) {
        require(votingEnded, "Voting has not ended");

        string memory winner;
        uint256 maxVotes = 0;

        for (uint256 i = 0; i < candidateIds.length; i++) {
            string memory candidateId = candidateIds[i];
            if (candidates[candidateId].votes > maxVotes) {
                maxVotes = candidates[candidateId].votes;
                winner = candidates[candidateId].name;
            }
        }

        return (winner, maxVotes);
    }

    /**
     * Function to get a summary of the election.
     * @return totalVotes The total number of votes cast.
     * @return totalCandidates The total number of candidates.
     */
    function getSummary() public view returns (uint256 totalVotes, uint256 totalCandidates) {
        require(votingEnded, "Voting has not ended");

        uint256 totalVoteCount = 0;
        for (uint256 i = 0; i < candidateIds.length; i++) {
            totalVoteCount += candidates[candidateIds[i]].votes;
        }

        return (totalVoteCount, candidateIds.length);
    }
}
